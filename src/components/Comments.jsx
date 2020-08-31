import React, { Component } from 'react';
import CommentSingle from './CommentSingle';

class Comments extends Component {
    state = {  }
    renderComments() {
        const comments = this.props.comments
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
        const {name, artist, albumArt, comments} = this.props
        return ( 
            <div>
                {this.renderComments()}
            </div>
         );
    }
}
 
export default Comments;

