import React from "react";
import "./Errors.css"

const posR={
    marginBottom: '190px',
    boxShadow: '5px 6px 6px 2px #e9ecef',
    alignItems: "center",
    borderRadius: 20, 
    backgroundColor: "#6ecebc", 
    fontWeight: "bold"
  }

const Errors=()=>{
    return(
        
        <div className="card p-3 mt-2 " style={posR} >
            <h1>Error: 404</h1>
            <h2>Lost your track?</h2>
            <h3>No worries. You can track the flow of your money</h3>
            <h4><a href="/" >Click here to get back on track</a></h4> 
        </div>
    )
}
export default Errors;