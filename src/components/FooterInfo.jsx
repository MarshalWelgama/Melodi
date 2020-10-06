import React, { Component } from 'react';
import { Icon } from 'semantic-ui-react'

class FooterInfo extends Component {
    render() { 
        return ( <footer className='main-footer' ><a style={{"padding-right":"10px", "text-decoration":'none', 'color':'#9FA0A1'}}href="https://github.com/MarshalWelgama/Spotify-Connect"><Icon name='github'/>Github</a><a style={{"text-decoration":'none', 'color':'#9FA0A1'}}href='https://www.linkedin.com/in/marshal-welgama-968459193/'><Icon name='linkedin'/>LinkedIn</a><a href="#" style={{'padding-left':'10px', 'color':'#9FA0A1', 'text-decoration':'none'}}>Contact Me</a></footer>
        );
    }
}
 
export default FooterInfo;