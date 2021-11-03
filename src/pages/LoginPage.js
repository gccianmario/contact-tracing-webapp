import * as React from "react"
import {useEffect, useState} from "react";
import {auth} from "../components/firebaseTools";

const LoginPage = ({setUser}) => {
    const [name, setName] = useState("");
    const [pass, setPass] = useState("");
    const [waitingLogin, setWaitingLogin] = useState(false)

    useEffect(()=>{
        auth.onAuthStateChanged((user) => {
            if (user)
                onSuccessLogin(user)
        });
    },[])


    const onSuccessLogin = (user) => {
        setUser(user)
    }
    const loginRequest = ()=>{
        setWaitingLogin(true)
        auth.signInWithEmailAndPassword(name, pass)
            .then((userCredential) => {
                onSuccessLogin(userCredential)
            }).catch(e=> {
            setWaitingLogin(false)
            alert(e)
        })
    }
    const onChangeName= (elm)=>{
        setName(elm.target.value)
    }
    const onChangePass= (elm)=>{
        setPass(elm.target.value)
    }

    return (
        <div className="w-screen h-screen flex justify-center items-center bg-gray-100">
            <form className="p-10 bg-white rounded flex justify-center items-center flex-col shadow-md">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-20 h-20 text-gray-600 mb-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
                </svg>
                <p className="mb-5 text-3xl uppercase text-gray-600">Login</p>
                <input onChange={onChangeName} type="email" name="email" className="mb-5 p-3 w-80 focus:border-purple-700 rounded border-2 outline-none" autoComplete="off" placeholder="Email" required/>
                    <input onChangeCapture={onChangePass} type="password" name="password" className="mb-5 p-3 w-80 focus:border-purple-700 rounded border-2 outline-none" autoComplete="off" placeholder="Password" required/>
                        <button className="bg-purple-600 hover:bg-purple-900 text-white font-bold p-2 rounded w-80" id="login" onClick={loginRequest} disabled={waitingLogin}><span>Login</span></button>
            </form>
        </div>
    )
}

export default LoginPage
