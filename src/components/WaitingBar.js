import React, {useState} from "react";
import LinearProgress from '@material-ui/core/LinearProgress'

const  WaitingBar = ({loading}) => {
    return (
        <div style={{width:"100%", display:"flex", justifyContent:"center", flexDirection:"column"}}>
            {
                loading ?
                    <div style={{width:"100%", display:"flex", alignItems:"center", flexDirection:"column"}}>
                        <LinearProgress style={{width:"90%", marginTop:"3rem"}} />
                        {/* <LinearProgress style={{width:"90%", marginTop:"2rem"}} color="secondary" />*/}
                    </div>
                    :null
            }
        </div>
    )
}

export default WaitingBar;