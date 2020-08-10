import React, { Component } from 'react';
import "./Front.css";
import 'bootstrap/dist/css/bootstrap.css';
import { Container, Row, Col } from 'react-bootstrap';
class Logo extends Component {
    state = {  }
    render() { 
        return ( 
            
            <div className="login-page">
            <img className="logo-img" src="/logo.png" ></img>
           
            <div className="description-text">
               
            <input className="form-box py-4 mb-5" type="email" id="email" placeholder="       Enter Your Email" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"/>
            </div>
        
            {/* <a className="login-button">LOGIN WITH SPOTIFY</a> */}
            </div>
        )
    }
}
 
export default Logo;