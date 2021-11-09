import './App.css';
import LoginPage from "./pages/LoginPage";
import React, {useState} from "react";
import Base from "./pages/Base";

/*
    Hooks for Querying Data
Once React has an instance of the Neo4j Driver to query against, you can use the useReadCypher and useWriteCypher
hooks to run a query against the database. Both procedures take three arguments; the cypher query, an object
to represent any parameters, and optionally the database to run the query against if running multiple databases.
 They both return an object which corresponds to the Neo4jResultState interface.
*/

function App() {
    //state that store the data about logged user
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
