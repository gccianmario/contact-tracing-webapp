import React, {useState} from "react";
//import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";
import { Routes, Route, Link } from "react-router-dom";
import {auth} from "../components/firebaseTools"
import icon from '../logo.svg';
import icon2 from '../photo57.jpg';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';

import LinearProgress from '@material-ui/core/LinearProgress'
import {useReadCypher} from "use-neo4j";
import QueryViewer from "./QueryViewer";

//handle navbar and the connected routes
const navigation = [
    { name: 'People', href: '/peopleList', current: false },
    { name: 'High risk', href: '/query1', current: false },
    { name: 'Medium risk', href: '/query2', current: false },
    { name: 'Query3', href: '/query3', current: false },
    { name: 'Query 4', href: '/query4', current: false },
    { name: 'Query 5', href: '/query5', current: false },
]

const titles = ['Name, Id, test']   //use them as displayed titles for the query viewer
const properties = ['Name, Id, test'] // use this names to refer to the data in the json from the db

//QUERY DEFINITION
const query0=''
const query1=''
const query2=''
const query3=''
const query4=''
const query5=''

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
        //execute the cyper query and get the result in a js list together with loading and error
        //const queryTest = `MATCH (movie:Movie) RETURN movie LIMIT 10`
        const queryTest = `MATCH (p:Person) RETURN p LIMIT 10`
        const title = 'Apollo 13'
        //const params = { title } // Movie title passed as a prop

        const {
            loading,
            error,
            records,
            first
        } = useReadCypher(queryTest, params)

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
            <div style={{marginTop:"10%",display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center"}}>
                <img
                    className="hidden lg:block h-8 w-auto"
                    src={icon}
                    alt="Logo"
                    style={{height:"15rem", width:"15rem", marginTop:"1rem", marginBottom:"4rem"}}
                />
                <Button
                    variant='contained'
                    onClick={sigOutRequest}
                >Logout</Button>
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
                           <QueryViewer ExecuteQuery={ExecuteQuery} query={query0} params={""} titles={[]} properties={[]}/>
                       }
                />
                <Route exact path="/query1"
                       element={
                           <QueryViewer ExecuteQuery={ExecuteQuery} query={query1} params={""} titles={[]} properties={[]}/>
                       }
                />
                <Route exact path="/query2"
                       element={
                           <QueryViewer ExecuteQuery={ExecuteQuery} query={query2} params={""} titles={[]} properties={[]}/>
                       }
                />
                <Route exact path="/query3"
                       element={
                           <QueryViewer ExecuteQuery={ExecuteQuery} query={query3} params={""} titles={[]} properties={[]}/>
                       }
                />
                <Route exact path="/query4"
                       element={
                           <QueryViewer ExecuteQuery={ExecuteQuery} query={query4} params={""} titles={[]} properties={[]}/>
                       }
                />
                <Route exact path="/query5"
                       element={
                           <QueryViewer ExecuteQuery={ExecuteQuery} query={query5} params={""} titles={[]} properties={[]}/>
                       }
                />
            </Routes>
        </div>
    );
}

export default Base;
