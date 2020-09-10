import React, { Component } from 'react';
import 'fontsource-roboto';
import Paper from '@material-ui/core/Paper';
import { Button, Card, Comment, Form, Header, CommentGroup } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'

class CommentSingle extends Component {
    state = { }
    renderReplies() {
        const {comment, replies} = this.props
        if(replies) { // check reply array length, if > 1 then return comments.
            return (
                // enclose comments within the CommentGroup (use map functoin)
                <CommentGroup> 
                    <Comment>
                  <Comment.Avatar as='a' src='https://react.semantic-ui.com/images/avatar/small/jenny.jpg' />
                  <Comment.Content>
                    <Comment.Author as='a'>Jenny Hess</Comment.Author>
                    <Comment.Metadata>
                      <span>Just now</span>
                    </Comment.Metadata>
                    <Comment.Text>Testing a reply on a comment 1</Comment.Text>
                    <Comment.Actions>
                      <a>Reply</a>
                    </Comment.Actions>
                  </Comment.Content>
                </Comment>
              
                <Comment>
                  <Comment.Avatar as='a' src='https://react.semantic-ui.com/images/avatar/small/jenny.jpg' />
                  <Comment.Content>
                    <Comment.Author as='a'>Jenny Hess</Comment.Author>
                    <Comment.Metadata>
                      <span>Just now</span>
                    </Comment.Metadata>
                    <Comment.Text>Testing reply on a comment 2</Comment.Text>
                    <Comment.Actions>
                      <a>Reply</a>
                    </Comment.Actions>
                  </Comment.Content>
                </Comment>
                </CommentGroup>
            )
        }
        else {
            return null
        }
        
    }
    render() { 
       // https://api.spotify.com/v1/users/12142897666
        const {comment} = this.props
        return ( 
            
            <React.Fragment>
            <Card style={{'padding':'15px', 'margin':'10px'}} fluid color="grey">
            <Comment>
              <Comment.Avatar as='a' src='https://react.semantic-ui.com/images/avatar/small/elliot.jpg' />
              <Comment.Content>
              <Comment.Author as='a' href={"https://open.spotify.com/user/".concat(comment.userId)}>Marshal Welgama</Comment.Author>
                <Comment.Metadata>
                  <span>Today at 5:42PM</span>
                </Comment.Metadata>
                <Comment.Text>{comment.text}</Comment.Text>
                <Comment.Actions>
                  <a>Reply</a>
                </Comment.Actions>
              </Comment.Content>
              {this.renderReplies()}
              {/* render replies here.  put inside <Coment Group> {all comment rpelies here} </comment group>*/}
              
            </Comment>
            </Card>

            </React.Fragment>
          
         
    //   <div style={{'display':'grid', 'justifyContent':'center'}}>
    //         <Card style={{'padding':'15px', 'margin':'10px'}} >
    //         <Comment.Group>
    //         <Comment>
    //           <Comment.Avatar src='https://react.semantic-ui.com/images/avatar/small/matt.jpg' />
    //           <Comment.Content>
    //             <Comment.Author as='a' href={"https://open.spotify.com/user/".concat(comment.userId)}>Marshal Welgama</Comment.Author>
    //             <Comment.Metadata>
    //               <div>Today at 5:42PM</div>
    //             </Comment.Metadata>
    //             <Comment.Text>{comment.text}</Comment.Text>
    //             <Comment.Actions>
    //               <Comment.Action>Reply</Comment.Action>
    //             </Comment.Actions>
    //           </Comment.Content>
    //         </Comment>
    //         </Comment.Group>
    //         </Card>
    //         </div>
    
        );
    }
}
 
export default CommentSingle;