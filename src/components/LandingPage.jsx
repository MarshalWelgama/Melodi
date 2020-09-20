import React, { Component } from "react";
import { Image, Popup, Icon } from 'semantic-ui-react'
import "./LandingPage.css";

class LandingPage extends Component {
  state = {};
  render() {
    return (
      <div className="login-page">
   
        <div className="contentBorder">
        <Image className="logo-img" src="/melodi-logo.png" verticalAlign='top' />
      <br></br>
      <div className="CallToAction">
        <div style={{"display" : "inline-block"}}>
        <a style={{"text-decoration":'none', 'color':'black'}}href="http://localhost:8888/login" className="login-button">
          LOGIN WITH SPOTIFY
        </a>
        </div>
        <div classname="whatis" style={{'grid-row': '2/2', "paddingTop":"15px"}}>
        <Popup
          trigger={   <span  style={{"padding-top": "10px"}}>what is this project?</span>}
          content='Melodi allows you to add comments to your favourite music!'
          position='bottom center'
        />
     
        </div>
        </div>
        </div>
       <footer className='main-footer' ><a style={{"padding-right":"10px", "text-decoration":'none', 'color':'#9FA0A1'}}href="https://github.com/MarshalWelgama/Spotify-Connect"><Icon name='github'/>Github</a><a style={{"text-decoration":'none', 'color':'#9FA0A1'}}href='https://www.linkedin.com/in/marshal-welgama-968459193/'><Icon name='linkedin'/>LinkedIn</a><a href="#" style={{'padding-left':'10px', 'color':'#9FA0A1', 'text-decoration':'none'}}>Contact Me</a></footer>
      </div>
    );
  }
}

export default LandingPage;
