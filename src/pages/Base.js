import React, {useState} from "react";
import { Routes, Route, Link } from "react-router-dom";
import {auth} from "../components/firebaseTools"
import icon from '../logo.svg';
import {useReadCypher} from "use-neo4j";
import QueryViewer from "./QueryViewer";
import PeopleViewer from "./PeopleViewer";

//handle navbar and the connected routes
const navigation = [
    { name: 'People', href: '/peopleList', current: false },
    { name: 'Dangerous chains', href: '/query1', current: false },
    { name: 'General contacts', href: '/query2', current: false },
    { name: 'Contacts among families', href: '/query3', current: false },
    { name: 'High intensity chains', href: '/query4', current: false },
    { name: 'Not vaccinated contacts', href: '/query5', current: false },
]

const titles =     ['First name', 'Last name', 'SSN','Vaccinated', 'Infected']  //use them as displayed titles for the query viewer
const properties = ['firstName', 'lastName', 'CF','vaccinated', 'infected'] // use this names to refer to the data in the json from the db

//QUERY DEFINITION
const query0='MATCH (p:Person) RETURN p limit 100'
const query1='MATCH path = ( (p:Person{infected:false})-[r1:HAD|WITH*1..3]-(c:Contact)-[r2:HAD|WITH*1..3]-(p2{infected:true}))\n' +
    'WITH nodes(path) AS pathNodes,p\n' +
    'WHERE ALL(c IN pathNodes WHERE c:Contact OR c:Person)\n' +
    'WITH pathNodes, REDUCE(totalIntensity = 0, n IN pathNodes | totalIntensity + COALESCE(n.intensity, 0)) AS reduction,p\n' +
    'WHERE reduction >=180\n' +
    'RETURN DISTINCT p, pathNodes'
const query2='MATCH (p:Person{infected: false})-[g:GOES_IN]->(e2:Event)<-[:GOES_IN]-(p3:Person),(p4:Person)-[:GOES_IN]->(e1:Event)<-[g1:GOES_IN]-(p)-[h:HAD|WITH]-(c:Contact)-[w:WITH|HAD]-(p2:Person) \n' +
    'where p2.infected = true \n' +
    'and p3.infected = true\n' +
    'and p4.infected = true\n' +
    'and e1 <> e2 \n' +
    'and g1 <> g\n' +
    'return distinct p'
const query3='MATCH (p:Person{infected: false})-[:LIVES]->(h1:House)<-[:LIVES]-(fam1: Person{infected: false}),(fam1)-[:HAD|WITH]-(c:Contact)-[:HAD|WITH]-(fam2:Person),(fam2)-[:LIVES]->(h2:House)<-[:LIVES]-(inf:Person{infected: true})\n' +
    'WHERE c.intensity>=95\n' +
    'RETURN DISTINCT p'
const query4='MATCH path = (p:Person{infected:false})-[:HAD|WITH*]-(c:Contact)-[:WITH|HAD*]-(p2:Person{infected:true})\n' +
    'WHERE ALL(elm IN nodes(path) WHERE (elm:Contact and elm.intensity>=90)  or elm:Person) \n' +
    'WITH p,nodes(path) as chain,p2\n' +
    'RETURN DISTINCT  p,chain,p2'
const query5='MATCH  \n' +
    '(p1:Person{infected:TRUE})-[:LIVES]->(:House)<-[:LIVES]-(famp1:Person{vaccinated:FALSE})-[:GOES_IN]->(:Event)<-[:GOES_IN]-(p:Person{vaccinated:FALSE}) \n' +
    'RETURN distinct p \n' +
    'UNION \n' +
    'MATCH \n' +
    '(p2:Person{infected:TRUE})-[:LIVES]->(:House)<-[:LIVES]-(famp2:Person{vaccinated:FALSE})-[:HAD|WITH]-(:Contact)-[:HAD|WITH]-(p:Person{vaccinated:FALSE}) \n' +
    'RETURN distinct p'

function Base({user, setUser}) {
    const [navState, setNavState] = useState(navigation)

    const classNames = (...classes) => {
        return classes.filter(Boolean).join(' ')
    }
    const sigOutRequest = () => {
        //setWaitingLogout(true)
        auth.signOut().then(() => {
            //navigation.popToTop()
            setUser(null)
        })
            .catch((error) => {alert(error)})
        // .finally(()=>setWaitingLogout(false));
    }
    const onClickLink = (index)=>{
        //used to power the navbar selected element status
        let newNavigation = [...navigation]
        newNavigation.forEach((elm)=>{
            elm.current=false
        })
        newNavigation[index].current = true
        setNavState(newNavigation)
    }
    const ExecuteQuery = (query, params)=>{
        const {
            loading,
            error,
            records,
            first
        } = useReadCypher(query, params)
        //console.log("EX " + query)
        let results = []
        if(records) {
            records.forEach((elm) => {
                // Get the data you asked for with the names used in the query
                const node = elm.get('p')
                results.push(node.properties)
            })
        }

        return {
            loading,
            error,
            results
        }
    }

    const Dashboard = ()=> {
        return (
            <div style={{marginTop:"15%",display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center"}}>
                <img
                    className="hidden lg:block h-8 w-auto"
                    src={icon}
                    alt="Logo"
                    style={{height:"15rem", width:"15rem"}}
                />
            </div>
        )
    }

    return (
        <div style={{width:"100%"}}>
            <div className="bg-gray-800">
                <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
                    <div className="relative flex items-center justify-between h-16">
                        <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                            <div className="flex-shrink-0 flex items-center">
                                <img
                                    className="block lg:hidden h-8 w-auto"
                                    src={icon}
                                    alt="Workflow"
                                />
                                <img
                                    className="hidden lg:block h-8 w-auto"
                                    src={icon}
                                    alt="Logo"
                                />
                            </div>
                            <div className="hidden sm:block sm:ml-6">
                                <div className="flex space-x-4">
                                    {navState.map((item,i) => (
                                        <button key={i} onClick={()=>onClickLink(i)}>
                                            <Link
                                                //key={item.name}
                                                to={item.href}
                                                className={classNames(
                                                    item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                                    'px-3 py-2 rounded-md text-sm font-medium'
                                                )}
                                                aria-current={item.current ? 'page' : undefined}
                                            >
                                                {item.name}
                                            </Link>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <button
                            onClick={sigOutRequest}
                            type="button"
                            className="text-white hover:bg-red-700 hover:text-white
                                                    px-3 py-2 rounded-md text-sm font-medium"
                        >
                            <span>Logout</span>
                        </button>
                    </div>
                </div>
            </div>
            <Routes>
                <Route exact path="/" element={<Dashboard/>}/>
                <Route exact path="/peopleList"
                       element={
                           <PeopleViewer ExecuteQuery={ExecuteQuery} query={query0} params={""} titles={titles} properties={properties}/>
                       }
                />
                <Route exact path="/query1"
                       element={
                           <QueryViewer key={"Q1"} ExecuteQuery={ExecuteQuery} query={query1} params={""} titles={titles} properties={properties}/>
                       }
                />
                <Route exact path="/query2"
                       element={
                           <QueryViewer key={"Q2"} ExecuteQuery={ExecuteQuery} query={query2} params={""} titles={titles} properties={properties}/>
                       }
                />
                <Route exact path="/query3"
                       element={
                           <QueryViewer key={"Q3"} ExecuteQuery={ExecuteQuery} query={query3} params={""} titles={titles} properties={properties}/>
                       }
                />
                <Route exact path="/query4"
                       element={
                           <QueryViewer key={"Q4"} ExecuteQuery={ExecuteQuery} query={query4} params={""} titles={titles} properties={properties}/>
                       }
                />
                <Route exact path="/query5"
                       element={
                           <QueryViewer key={"Q5"} ExecuteQuery={ExecuteQuery} query={query5} params={""} titles={titles} properties={properties}/>
                       }
                />
            </Routes>
        </div>
    );
}

export default Base;
