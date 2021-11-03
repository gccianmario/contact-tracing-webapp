import logo from './logo.svg';
import './App.css';
import LoginPage from "./pages/LoginPage";
import React, {useState} from "react";
import Base from "./pages/Base";
import {auth} from "./components/firebaseTools";


function App() {
  const [user, setUser] = useState(null)

  return (
      <div>
        {
          user ?
              <Base user={user} setUser={setUser}/>
              :
              <LoginPage setUser={setUser}/>
        }
      </div>
  );
}

export default App;
