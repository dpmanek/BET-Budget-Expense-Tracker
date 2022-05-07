import React from "react";
import "./OurTeam.css"

const posR={
    marginBottom: '190px',
    // boxShadow: '5px 6px 6px 2px #e9ecef',
    alignItems: "center",
    // borderRadius: 50, 
    // backgroundColor: "#f7f7f7", 
    fontWeight: "bold",
    height: 280,
    width: 500
  }

const Mission= ()=>{
    return(
        <div >
            <h1 className="pl"> Mission </h1>
            <div className="row col-md-12"> 
                <div className="col-md-5 img2">
                    <img src="cf.png" 
                    alt="Track your finance" width="400" height="300"></img>
                </div>
            
                <div className="col-md-7" style={posR}>
                    <p className="pl1">To help the users to manage and have a record of their finances based on their income and expenses.</p>
                </div>
            </div>
        </div>
    )

}
export default Mission;