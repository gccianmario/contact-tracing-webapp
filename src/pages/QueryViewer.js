import React, {useState} from "react";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";


const displayedList = []

const  QueryViewer = ({ExecuteQuery,query,params, titles,properties}) => {

    const {
        loading,
        error,
        results
    } = ExecuteQuery(query, params)

    return (
        <div style={{width:"100%", display:"flex", justifyContent:"center"}}>
            <div style={{width:"90%",alignSelf:"center", marginTop:"2rem", marginBottom:"2rem"}}>
                <TableContainer component={Paper}>
                    <Table size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow style={{backgroundColor:"coral"}}>
                                {/*<TableCell>Identificativo</TableCell>*/}
                                {
                                    titles.map((elm, i) => {
                                        return <TableCell key={elm + i} align="right">{elm}</TableCell>
                                    })
                                }
                            </TableRow>
                        </TableHead>
                        {/*
                        <TableBody>
                            {displayedList.map((row) => (
                                <TableRow key={row.id} onClick={()=>onClickItem(row)} style={{cursor:"pointer"}}>
                                    {/*<TableCell component="th" scope="row" >
                                        {row.id}
                                    </TableCell>*
                                    {
                                        clientIndexes.map((elm,i)=>{
                                            return <TableCell key={row.id + elm} align="right">{row[elm]}</TableCell>
                                        })
                                    }
                                </TableRow>
                            ))}
                        </TableBody>
                */}
                    </Table>
                </TableContainer>
            </div>
        </div>
    )
}

export default QueryViewer;