import React, {useState} from "react";
import LinearProgress from '@material-ui/core/LinearProgress'
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import TextField from '@material-ui/core/TextField';

const  PeopleTable = ({loading, titles,properties, results, showSearch=false, setAnalyzedPerson, clickable=false}) => {
    const [filter, setFilter] = useState("")

    const executeQuery = (target, originalData) =>{
        let filteredResult = []
        //check if the filter is not null
        if(target)
            originalData.forEach((elm)=>{
                if(elm) {
                    const str1 = elm["firstName"] ? elm["firstName"] : ""
                    const str2 = elm["lastName"] ? elm["lastName"] : ""
                    const fullStr = str1 + " "+ str2
                    if (fullStr.toString().toLowerCase().search(target.toString().toLowerCase()) >= 0)
                        filteredResult.push(elm)
                }
            })
        else return originalData
        return filteredResult
    }
    const onClickPerson = (person) => {
        if(setAnalyzedPerson)
            setAnalyzedPerson(person)
    }
    const filteredResults = executeQuery(filter, results)

    return (
        <div style={{display:"flex", flexDirection:"column"}}>
            {
                !loading ?
                    <div style={{display:"flex",width: "90%", alignSelf: "center", marginTop: "2rem", marginBottom: "2rem", flexDirection:"column"}}>
                        {
                            showSearch ?
                                <div style={{width:"100%",alignSelf:"center", marginBottom:"2rem"}}>
                                    <TextField
                                        style={{width:"450px"}}
                                        label={"Search"}
                                        onChange={(elm)=>setFilter(elm.target.value)}
                                        //defaultValue={''}
                                        //disabled={true}
                                        mode={'outlined'}
                                    />
                                </div>
                                : null
                        }
                        <TableContainer component={Paper} style={{maxHeight: "800px"}}>
                            <Table stickyHeader size="small" aria-label="a dense table">
                                <TableHead>
                                    <TableRow>
                                        {
                                            titles.map((elm, i) => {
                                                return <TableCell style={{backgroundColor: "coral"}} key={elm + i}
                                                                  align="right">{elm}</TableCell>
                                            })
                                        }
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        filteredResults.map((person) => (
                                            <TableRow key={person["CF"]} style={clickable ? {cursor: "pointer"} : null}>
                                                {
                                                    properties.map((prop, i) => {
                                                        return <TableCell
                                                            onClick={clickable ? ()=>onClickPerson(person) : ()=>null}
                                                            key={person["CF"] + prop}
                                                            align="right">
                                                            {person[prop] ? person[prop].toString() : ""}
                                                        </TableCell>
                                                    })
                                                }
                                            </TableRow>
                                        ))
                                    }
                                </TableBody>

                            </Table>
                        </TableContainer>
                    </div>
                    :null
            }
        </div>
    )
}

export default PeopleTable;