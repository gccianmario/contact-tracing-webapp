import React, {useEffect, useState} from "react";
import PeopleTable from '../components/PeopleTable'
import WaitingBar from "../components/WaitingBar";
import ModifyPersonPanel from "../components/ModifyPersonPanel";


const  PeopleViewer = ({ExecuteQuery,query,params, titles,properties}) => {
    const [analyzedPerson, setAnalyzedPerson] = useState("")
    const messagesEndRef = React.createRef()
    const messagesStartRef = React.createRef()
    const {
        loading,
        error,
        results
    } = ExecuteQuery(query, params)

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }
    const scrollToTop = () => {
        messagesStartRef.current?.scrollIntoView({ behavior: "smooth" })
    }
    useEffect(()=>{
        if(analyzedPerson) {
            if (scrollToTop)
                scrollToBottom()
        }
        else if(scrollToTop)
            scrollToTop()
    },[analyzedPerson])
    return (
        <div ref={messagesStartRef} style={{width:"100%", display:"flex", justifyContent:"center", flexDirection:"column"}}>
            <WaitingBar loading={loading}/>
            <PeopleTable
                error={error}
                showSearch={true}
                properties={properties}
                titles={titles}
                loading={loading}
                results={results}
                setAnalyzedPerson={setAnalyzedPerson}
                clickable={true}
            />
            <div ref={messagesEndRef} style={{marginBottom:"2rem"}}>
                <ModifyPersonPanel
                    ExecuteQuery={ExecuteQuery}
                    ref={messagesEndRef}
                    loading={loading}
                    properties={properties}
                    titles={titles}
                    setAnalyzedPerson={setAnalyzedPerson}
                    personData={analyzedPerson}
                    scrollToBottom={scrollToBottom}
                />
            </div>
        </div>
    )
}

export default PeopleViewer;