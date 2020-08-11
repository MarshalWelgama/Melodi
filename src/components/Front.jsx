import React, { Component } from 'react';
import "./Front.css";
import 'bootstrap/dist/css/bootstrap.css';
import Tooltip from 'react-bootstrap/Tooltip'
import { OverlayTrigger, Button } from 'react-bootstrap';
class Logo extends Component {
    state = {}
    render() {
        return (

            <div className="login-page">
                <img className="logo-img" src="/logo.png" ></img>
                <div className="description-text">
                    <h2 className="info-text">Join the Waitlist to stay updated<OverlayTrigger
                        placement={'top'}
                        overlay={<Tooltip className="mytooltip">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</Tooltip>}
                    >
                        <h2 className="hover-text">        Hover for more info             <br></br> </h2>
                    </OverlayTrigger></h2>  
                    <input className="form-box py-4" type="email" id="email" placeholder="       Enter Your Email" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" />
                </div>
                    )
               
                {/* <a className="login-button">LOGIN WITH SPOTIFY</a> */}
            </div>

        )
    }
}

export default Logo;