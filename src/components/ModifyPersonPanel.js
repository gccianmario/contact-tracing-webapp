import React, {useState} from "react";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';

const  ModifyPersonPanel = ({personData, titles,properties, setAnalyzedPerson,loading,scrollToBottom}) => {
    const onCancelModify = () =>{
        if(setAnalyzedPerson)
            setAnalyzedPerson(null)
    }
    const modifyRequest = (userId, userObj) =>{
        if(!(userId && userObj)){
            alert("Alcuni campi sono nulli!")
            return
        }
        if(userObj.id)
            delete userObj.id


    }
    const deleteRequest = (id) =>{
        if(!id){
            alert("Nessun Id da eliminare!")
            return
        }
        //setWaitingDelete(true)

    }
    const safeScrollToBottom = () =>{
        if(scrollToBottom)
            scrollToBottom()
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
                                                return <TextField
                                                    style={{marginRight:"2rem"}}
                                                    key={"T"+elm}
                                                    id={elm}
                                                    label={elm}
                                                    //onChange={onChangeValue}
                                                    //defaultValue={''}
                                                    value={personData[""+elm]}
                                                    //disabled={true}
                                                    mode={'outlined'}
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
                                        onClick={()=>deleteRequest()}
                                        //loading={waitingDelete}
                                        //disabled={waitingDelete}
                                        //style={styles.deleteBtn}
                                    >Delete</Button>
                                    <Button
                                        variant='contained'
                                        onClick={()=>modifyRequest()}
                                        //loading={waitingModify}
                                        //disabled={waitingModify}
                                    >Modify</Button>
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