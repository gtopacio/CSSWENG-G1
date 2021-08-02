import React from 'react'
import defaultdp from "../images/defaultdp.jpg";
import '../css/Profile.css' ;

export default function Profile() {
    return (
        <section className="custom-section" style={{minHeight:'90vh'}}>
            <div className="container d-flex align-items-center justify-content-center" style={{minHeight:'inherit'}}> 
                <div className="row">
                    <div className="col-12 mx-auto text-center">
                        <img src={defaultdp} className="mx-auto btn dropdown-toggle displayPicture text-center" id="displayPictureDropdown" title="displayPicture" alt="displayPicture" data-bs-toggle="dropdown" />
                    </div>
                    <div className="col d-flex justify-content-center">  
                    </div>
                    <div className="col-12 mx-auto pt-2">
                        <p style={{textAlign:'center',fontSize:'30pt',fontWeight:'400', marginBottom:'-0.4em'}}>
                            Name Here
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}
