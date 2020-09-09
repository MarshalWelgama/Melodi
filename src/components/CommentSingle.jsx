import React, { Component } from 'react';
import 'fontsource-roboto';
import Paper from '@material-ui/core/Paper';
import { Button, Card, Comment, Form, Header } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'

class CommentSingle extends Component {
    state = {  }
    render() { 
        const {comment} = this.props
        return ( 
      <div style={{'display':'grid', 'justifyContent':'center'}}>
            <Card style={{'padding':'15px', 'margin':'10px'}} >
            <Comment.Group>
            <Comment>
              <Comment.Avatar src='https://react.semantic-ui.com/images/avatar/small/matt.jpg' />
              <Comment.Content>
                <Comment.Author as='a'>Marshal Welgama</Comment.Author>
                <Comment.Metadata>
                  <div>Today at 5:42PM</div>
                </Comment.Metadata>
                <Comment.Text>{comment.text}</Comment.Text>
                <Comment.Actions>
                  <Comment.Action>Reply</Comment.Action>
                </Comment.Actions>
              </Comment.Content>
            </Comment>
            </Comment.Group>
            </Card>
            </div>
    
        );
    }
}
 
export default CommentSingle;