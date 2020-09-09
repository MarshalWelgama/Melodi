import React, { Component } from 'react';
import CommentSingle from './CommentSingle';
import { Header } from 'semantic-ui-react'
class Comments extends Component {
    state = {  }
    renderComments() {
        const {comments} = this.props
        var prettyComments = []
        for (var i = 0; i < comments.length; i++) {
          prettyComments.push(comments[i])
          }
    
          console.log(prettyComments)
          return ( 
            <React.Fragment>
              {prettyComments.map(comment => (
                <CommentSingle comment={comment}></CommentSingle>
              ))}
            </React.Fragment>
          );
        }
    render() { 

        return ( 
            <React.Fragment>

            <div>
                {this.renderComments()}
            </div>
            </React.Fragment>
         );
    }
}
 
export default Comments;

