import React from "react";
import PeopleTable from "../components/PeopleTable";
import WaitingBar from "../components/WaitingBar";

// component able to execute queries that have as final result a list of people
const  QueryViewer = ({ExecuteQuery,query,params, titles,properties}) => {
    const {
        loading,
        error,
        results
    } = ExecuteQuery(query, params)
    return (
        <div style={{width:"100%", display:"flex", justifyContent:"center", flexDirection:"column"}}>
            <WaitingBar loading={loading}/>
            <PeopleTable
                error={error}
                properties={properties}
                titles={titles}
                loading={loading}
                results={results}
            />
        </div>
    )
}

export default QueryViewer;