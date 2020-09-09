import React, { Component } from 'react';
import { Header, Icon, Image, Segment } from 'semantic-ui-react'
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
        const { songName, artist, albumArt } = this.props
        console.log(artist);
        
        return (
            
            <Segment>
                <Header as='h3' textAlign='left'>
                    Logged in as: <a href="#">Marshal Welgama</a>
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
             
            </Segment>
        );
    }
}

export default SongHeader;