import React, { Component } from 'react';
import { Icon, Image, Item, Card } from 'semantic-ui-react'

const description = () => {
    return (
      <React.Fragment>
        <div>
          <img className="song-album-art"src="https://react.semantic-ui.com/images/wireframe/image.png"/>
        </div>
        <div className="song-line-info">
            <div><span>18 Hunna (feat dave) </span> </div>
            <div><span>Headie One, Dave</span></div>
        
        </div>
      </React.Fragment>
    );
  };
  const CardExampleExtraContent = () => (
    <Card style={{'margin': '0', 'width':'350px'}}>
      <Card.Content header="Recent Comments" />
      <Card.Content className="song-line"description={description} />
      <Card.Content className="song-line"description={description} />
      <Card.Content className="song-line"description={description} />
      <Card.Content className="song-line"description={description} />
      <Card.Content className="song-line"description={description} />
    </Card>
  );
  
 export default CardExampleExtraContent;