import icon2 from '../logo.svg';
import icon from '../photo57.jpg';
import React, {useEffect, useState} from "react";
//import { BrowserRouter as Router,Switch, Route, Link, Redirect } from "react-router-dom";
import {auth} from "../components/firebaseTools"
import Button from '@material-ui/core/Button';
import LinearProgress from '@material-ui/core/LinearProgress'
import {useReadCypher} from "use-neo4j";




const navigation = [
    { name: 'Clienti', href: '/modifyClient', current: false },
    { name: 'Aparati A', href: '/itemAnti', current: false },
    { name: 'Interventi A', href: '/intAnti', current: false },
    { name: 'Riga A', href: '/rigaA', current: false },
    { name: 'Colonna A', href: '/colonnaA', current: false },
    { name: 'Infestanti', href: '/infestanti', current: false },
    { name: 'Interventi D', href: '/intDisi', current: false },
    { name: 'Stato saldo', href: '/statosaldo', current: false },
    { name: 'Modalità Pagamento', href: '/modpagamento', current: false },
]

function Base({user, setUser}) {
    useEffect(()=>{
        /*
        readRequest('collectionName')
            .then(()=>{
                //read done
            })
            .catch((e)=>alert("Errore leggendo struttura " + e))
*/
    },[])
    const readRequest = (collectionName) => {
        //call to neo4j
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

    const HomePage = () => {
        return (
            <div style={{marginTop:"10%",display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center"}}>
                <img
                    className="hidden lg:block h-8 w-auto"
                    src={icon2}
                    alt="Logo"
                    style={{height:"15rem", width:"15rem", marginBottom:"2rem"}}
                />
                <Button
                    variant='contained'
                    onClick={sigOutRequest}
                >Logout</Button>
                <img
                    className="hidden lg:block h-8 w-auto"
                    src={icon}
                    alt="Logo"
                    style={{height:"15rem", width:"15rem", marginTop:"16rem"}}
                />
            </div>
        )
    }
    const ExecuteQuery = (query)=>{
        //const queryTest = `MATCH (movie:Movie) RETURN movie LIMIT 10`
        const queryTest = `MATCH (p:Person) RETURN p LIMIT 10`
        const title = 'Apollo 13'
        const params = { title } // Movie title passed as a prop

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

    const {
        loading,
        error,
        results
    } = ExecuteQuery('')

    return (
        <div>
            {
                loading ?
                    <div style={{marginTop:"2rem"}}>
                        <LinearProgress style={{width:"90%", marginTop:"3rem"}} />
                        <LinearProgress style={{width:"90%", marginTop:"2rem"}} color="secondary" />
                    </div>
                    :null
            }
            {
                error ?
                    <div style={{marginTop:"2rem"}}>
                        <div className="error">{error.message}</div>
                    </div>
                    :null
            }
            {
                results ?
                    results.map((elm,i) => {
                        //const node = elm.get('p')
                        console.log(elm)
                        return <p style={{marginLeft:"3rem"}} key={i}>{elm.firstName}</p>
                    })
                    : null
            }
            <HomePage/>

        </div>
    )
}

export default Base;
