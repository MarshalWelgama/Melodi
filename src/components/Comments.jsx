import React, { Component } from 'react';
import CommentSingle from './CommentSingle';
import { Header, Comment } from 'semantic-ui-react'
class Comments extends Component {
    state = {  }
    renderComments() {
        const {comments, replies} = this.props
        var prettyComments = []
        for (var i = 0; i < comments.length; i++) {
          prettyComments.push(comments[i])
          }
    
          console.log(prettyComments)
          return ( 
            <React.Fragment>
              {prettyComments.map(comment => (
                <CommentSingle comment={comment} replies={replies}></CommentSingle>
              ))}
            </React.Fragment>
          );
        }
    render() { 

        return ( 
            <div style={{'display':'grid', 'justifyContent':'center','text-align': 'center'}}>
                <Comment.Group threaded>
            <Header  as='h3' dividing >
              All Comments
            </Header>
            <div style={{'text-align': 'start'}}>
                {this.renderComments()}
            </div>
            </Comment.Group>
            </div>
         );
    }
}
 
export default Comments;

