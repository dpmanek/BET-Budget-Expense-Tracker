import React from "react";
import "./OurTeam.css"

const OurTeam= ()=>{
    return (
        <div>
           <h1 className="pl"> Our Team</h1>
            <div className="row col-md-12 mains">
                <div className="col-md-3 profile-card">
                    <div className="img"><img src="Nirav.jpg" alt="Nirav"/></div>
                    <div className="caption">
                        <h3>Nirav Jain</h3>
                        <div className="link">
                            <a href="https://www.linkedin.com/in/niravjain98" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                        </div>
                    </div>
                </div>

                <div className="col-md-3 profile-card">
                    <div className="img"><img src="DeepM.jpg" alt="Deep"/></div>
                    <div className="caption">
                        <h3>Deep Manek</h3>
                        <div className="link">
                            <a href="https://www.linkedin.com/in/deepmanek" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                        </div>
                    </div>
                </div>

                <div className="col-md-3 profile-card">
                    <div className="img"><img src="Kevin.jpeg" alt="Kevin"/></div>
                    <div className="caption">
                        <h3>Kevin D'sa</h3>
                        <div className="link">
                            <a href="https://www.linkedin.com/in/kevindsa2017" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                        </div>
                    </div>
                </div>

                <div className="col-md-3 profile-card">
                    <div className="img"><img src="Amisha.jpg" alt="Amisha"/></div>
                    <div className="caption">
                        <h3>Amisha Antiya</h3>
                        <a href="https://www.linkedin.com/in/amisha-antiya" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                    </div>
                </div>
                
        </div>
    </div>
    )
}

export default OurTeam;