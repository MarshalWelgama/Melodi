import React, { Component } from 'react';
import "./Front.css";
class Logo extends Component {
    state = {  }
    render() { 
        return ( 
            <div className="login-page">
            <img className="logo-img" src="/logo.png" ></img>
            <a className="login-button">LOGIN WITH SPOTIFY</a>
            </div>
         );
    }
}
 
export default Logo;