import React, { Component } from 'react';

class CommentSingle extends Component {
    state = {  }
    render() { 
        return ( 
        <h1> THIS IS AN INDIVIDUAL:  {this.props.comment.text}</h1>
        );
    }
}
 
export default CommentSingle;