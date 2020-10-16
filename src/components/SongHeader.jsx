import React, { Component } from 'react';
import { Header, Icon, Image, Segment } from 'semantic-ui-react'
import "./SongHeader.css";


class SongHeader extends Component {
    state = {}
    renderArtist() {
        const {artist} = this.props
          return ( 
            <React.Fragment>
              {artist.map(name => (
                <div>{name}</div>
              ))}
            </React.Fragment>
          );
        }
    render() {
       

        const { songName, artist, albumArt, user } = this.props
        console.log(artist);
       
        return (
            
            <Segment>
              <div className="now-playing-header">
              <Header as='h3' textAlign='left'>
              
                <div>
                  <a><Icon name='user outline'/>  <a href={user.link} style={{"color":"#4A4A4A"}}>   {user.name}</a> </a>
                  <div>
                  <Icon name='home' />  <a href="/main" style={{"color":"#4A4A4A"}}>Home Page</a>
                  </div>
                
                  
                </div>
                </Header>
               
                <Header as='h2'>
            
                    <Image circular src={albumArt} />
                    <Header.Content>
                        {songName}
                        <Header.Subheader>
                            {this.renderArtist()}
                        </Header.Subheader>
                    </Header.Content>
                </Header>
              </div>
                
             
            </Segment>
        );
    }
}

export default SongHeader;