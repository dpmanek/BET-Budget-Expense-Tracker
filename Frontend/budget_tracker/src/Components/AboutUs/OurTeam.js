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
                        <h2>Nirav Jain</h2>
                        <div className="link">
                            <a href="https://www.linkedin.com/in/niravjain98" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                        </div>
                    </div>
                </div>

                <div className="col-md-3 profile-card">
                    <div className="img"><img src="DeepM.jpg" alt="Deep"/></div>
                    <div className="caption">
                        <h2>Deep Manek</h2>
                        <div className="link">
                            <a href="https://www.linkedin.com/in/deepmanek" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                        </div>
                    </div>
                </div>

                <div className="col-md-3 profile-card">
                    <div className="img"><img src="Kevin.jpeg" alt="Kevin"/></div>
                    <div className="caption">
                        <h2>Kevin D'sa</h2>
                        <div className="link">
                            <a href="https://www.linkedin.com/in/kevindsa2017" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                        </div>
                    </div>
                </div>

                <div className="col-md-3 profile-card">
                    <div className="img"><img src="Amisha.jpg" alt="Amisha"/></div>
                    <div className="caption">
                        <h2>Amisha Antiya</h2>
                        <a href="https://www.linkedin.com/in/amisha-antiya" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                    </div>
                </div>
                
        </div>
    </div>
    )
}

export default OurTeam;