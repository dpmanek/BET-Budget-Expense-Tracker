import React from "react";
import "./OurTeam.css"

const OurTeam= ()=>{
    return (
        <div>
           <h1 class="pl"> Our Team</h1>
            <div class="row col-md-12 mains">
                <div class="col-md-3 profile-card">
                    <div class="img"><img src="Nirav.jpg"/></div>
                    <div class="caption">
                        <h3>Nirav Jain</h3>
                        <div class="link">
                            <a href="https://www.linkedin.com/in/niravjain98" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                        </div>
                    </div>
                </div>

                <div class="col-md-3 profile-card">
                    <div class="img"><img src="DeepM.jpg"/></div>
                    <div class="caption">
                        <h3>Deep Manek</h3>
                        <div class="link">
                            <a href="https://www.linkedin.com/in/deepmanek" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                        </div>
                    </div>
                </div>

                <div class="col-md-3 profile-card">
                    <div class="img"><img src="Kevin.jpeg"/></div>
                    <div class="caption">
                        <h3>Kevin D'sa</h3>
                        <div class="link">
                            <a href="https://www.linkedin.com/in/kevindsa2017" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                        </div>
                    </div>
                </div>

                <div class="col-md-3 profile-card">
                    <div class="img"><img src="Amisha.jpg"/></div>
                    <div class="caption">
                        <h3>Amisha Antiya</h3>
                        <a href="https://www.linkedin.com/in/amisha-antiya" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                    </div>
                </div>
                
        </div>
    </div>
    )
}

export default OurTeam;