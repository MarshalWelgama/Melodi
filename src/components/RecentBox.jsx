import React, { Component } from 'react';
import { Icon, Image, Item, Card } from 'semantic-ui-react'
// const {data} = this.props

class RecentBox extends Component {
  state = {  }
  description = (details) => {
    return (
      <React.Fragment className="song-line-desc">
        <div>
          <img className="song-album-art"src={details.albumArt}/>
        </div>
        <div className="song-line-info">
            <div><span> {details.songName} </span> </div>
            <div><span>{details.artists.join(', ').length <= 35 ? details.artists.join(', ') : details.artists.join(', ').slice(0, 30) + "..." }</span></div>   
        </div>
      </React.Fragment>
    );
  };

  

  render() { 
    const {data, name} = this.props
    console.log(this.props.data)
    return (
      <Card className="card-parent"style={{'margin': '0', 'width':'350px'}}>
      <Card.Content className="card-header" header={name} />
  { data.map(details => (
    <Card.Content onClick={() => {window.location.replace(`http://localhost:3000/songs/${details.songId}`)}} className="song-line"description={this.description(details)} />
  ))} 
    </Card>
    );
  }

}
 
  export default RecentBox;