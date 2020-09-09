import React, { Component } from 'react';
import { Header, Icon, Image, Segment } from 'semantic-ui-react'
class SongHeader extends Component {
    state = {}
    render() {
        const { songName, artist, albumArt } = this.props
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
                            Headie One
                        </Header.Subheader>
                    </Header.Content>
                </Header>
             
            </Segment>
        );
    }
}

export default SongHeader;