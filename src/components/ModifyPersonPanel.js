import React, {useEffect, useState,useContext} from "react";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import Switch from '@material-ui/core/Switch';


//switch component with custom behavior
const CustomSwitch = ({newInfectedInit, setNewInfected,cf}) =>{
    const [state, setState] = useState(newInfectedInit);
    const handleSwitchChange = (e) => {
        setNewInfected(e.target.checked);
        setState(e.target.checked);
        // Add actions here for when the switch is triggered
    };
    useEffect(()=>{
        setState(newInfectedInit)
    },[newInfectedInit])
    const text = 'Infected';

    return (
        <div style={{marginTop:"1rem"}}>
            {text}
                <Switch
                    checked={state}
                    onChange={handleSwitchChange}
                    color="primary"
                />
        </div>
    );
};


const  ModifyPersonPanel = ({ExecuteQuery,personData, titles,properties, setAnalyzedPerson,loading,scrollToBottom}) => {
    const [newInfected, setNewInfected] = useState(personData ? personData['infected'] : false);

    const onCancelModify = () =>{
        if(setAnalyzedPerson)
            setAnalyzedPerson(null)
    }
    //function triggered on modify infection status
    const modifyInfectedRequest = (e) =>{
        ExecuteWriteQuery(personData['CF'],newInfected)
    }
    //function that execute queries using the base javascript connector of neo4j
    const ExecuteWriteQuery = (cf, status)=>{
        const query = `MATCH (p:Person{CF:\'${cf}\'}) SET p.infected = ${status} RETURN p`
        const neo4j = require('neo4j-driver')

        const cnx = {
            user: 'neo4j',
            password: 'D4N4p-6l1JgOpuTshHVo3jjS4_3ShEPjgzuRvYdUkwo',
            uri: 'neo4j+s://6b0acef3.databases.neo4j.io'
        }

        const driver = neo4j.driver(cnx.uri, neo4j.auth.basic(cnx.user, cnx.password))
        //console.log(driver)
        driver.verifyConnectivity()
            .then((cnxMsg) => {
                //console.log(cnxMsg)
            })

        const session = driver.session({ database: 'neo4j' })

        session.run(query)
            .subscribe({
                onKeys: keys => {
                    //console.log(keys)
                },
                onNext: record => {
                    console.log(record.get('p').properties)
                    alert("Success!! refresh the page to see the updates")
                    onCancelModify()
                },
                onCompleted: () => {
                    session.close()
                },
                onError: error => {
                    alert(error)
                }
            })

    }

    if (loading) return <div/>
    return (
        <div style={{width:"100%", display:"flex", justifyContent:"center", flexDirection:"column", alignItems:"center"}}>
            {
                personData ?
                    <div style={{width:"85%", marginTop:"2rem", marginBottom:"2rem"}}>
                        <Card style={{width:"100%"}}>
                            <div style={{flex:1,flexDirection:"column", alignItems:"center", justifyContent:"space-between"}}>
                                <CardContent>
                                    <Typography color="textSecondary" gutterBottom>
                                        {"Modify"}
                                    </Typography>
                                </CardContent>
                                <div style={{display:"flex",flexWrap: "wrap",marginTop:"1rem",marginBottom:"1rem", alignItems:"center", justifyContent:"center"}}>
                                    <div style={{display:"flex",flexWrap: "wrap",marginRight:"1rem",marginLeft:"1rem", alignItems:"center", justifyContent:"space-around"}}>
                                        {
                                            properties.map((elm,i)=>{
                                                if(elm !== 'infected')
                                                    return <TextField
                                                        style={{marginRight:"2rem"}}
                                                        key={"T"+elm}
                                                        id={elm}
                                                        label={elm}
                                                        //onChange={onChangeValue}
                                                        //defaultValue={''}
                                                        value={personData[""+elm]}
                                                        disabled={true}
                                                        mode={'outlined'}
                                                    />
                                                else return <CustomSwitch
                                                    key={"T"+elm}
                                                    cf={personData['CF']}
                                                    newInfectedInit={personData['infected']}
                                                    setNewInfected={setNewInfected}
                                                />
                                            })
                                        }
                                    </div>
                                </div>
                                <div style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    marginTop: "3rem",
                                    marginBottom: "2rem",
                                    alignItems: "center",
                                    justifyContent: "space-around",
                                    alignSelf: "center"
                                }}>
                                    <Button
                                        variant='contained'
                                        onClick={()=>onCancelModify()}
                                    >Close</Button>
                                    <Button
                                        variant='contained'
                                        onClick={()=>modifyInfectedRequest()}
                                        //loading={waitingModify}
                                        //disabled={waitingModify}
                                    >Modify infected status</Button>
                                </div>
                            </div>
                        </Card>
                    </div>
                    :null
            }
        </div>
    )
}

export default ModifyPersonPanel;