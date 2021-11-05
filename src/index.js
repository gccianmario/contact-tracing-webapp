import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Neo4jProvider, createDriver } from 'use-neo4j'
import { BrowserRouter } from "react-router-dom";
// Create driver instance, if we don't create this a form for the db connection will pop up
//const driver = createDriver('neo4j', 'localhost', 7687, 'neo4j', 'neo4j4j')
const driver = createDriver('neo4j', '6b0acef3.databases.neo4j.io', 7687, 'neo4j', 'D4N4p-6l1JgOpuTshHVo3jjS4_3ShEPjgzuRvYdUkwo')


ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <Neo4jProvider driver={driver}>
                <App />
            </Neo4jProvider>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
