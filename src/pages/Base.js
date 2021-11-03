import icon from '../logo.svg';
import React, {useState} from "react";
//import { BrowserRouter as Router,Switch, Route, Link, Redirect } from "react-router-dom";
import {auth} from "../components/firebaseTools"
import Button from '@material-ui/core/Button';




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
    const [globalData, setGlobalData] = useState(null)
    const [docData, setDocData] = useState(null)

    function classNames(...classes) {
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

    const HomePage = ()=> {
        return (
            <div style={{marginTop:"10%",display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center"}}>
                <img
                    className="hidden lg:block h-8 w-auto"
                    src={icon}
                    alt="Logo"
                    style={{height:"15rem", width:"15rem"}}
                />
                <Button
                    variant='contained'
                    onClick={sigOutRequest}
                >Logout</Button>
            </div>
        )
    }

    return (
        <div>
            <HomePage/>
        </div>
    );
}

export default Base;
