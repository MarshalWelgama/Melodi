import React, { Component } from 'react';
import axios from "axios";
import { Form, Button, TextArea} from "semantic-ui-react";
const footerStyle = {
    backgroundColor: "white",
    borderTop: "1px solid #E7E7E7",
    textAlign: "center",
    padding: "15px",
    position: "fixed",
    left: "0",
    bottom: "0",
    width: "100%", 
    display: "grid",
    placeItems: "center"
  };

class TextInput extends Component {
    state = { commentInput:''}
    handleChange = (e, { commentInput, value }) => this.setState({ [commentInput]: value });

     handleSubmit = () => {
         const { commentInput } = this.state;
         const {songId, renderComments} = this.props
         
         axios.post('http://localhost:8888/api/comments/', {
            songId:songId, //song ID
            text:commentInput //Input
          })
          .then(function (response) {
            console.log(response);
            renderComments(songId);
          })
          .catch(function (error) {
            console.log(error);
          });
          this.setState({ commentInput: '' })
         

  };

    render() { 
        const { commentInput } = this.state
        return (  
            <div>
                <div style={footerStyle}>
                    <Form style={{ 'width': '40%', 'padding-top': '10px' }} onSubmit={this.handleSubmit}>
                        <TextArea
                            placeholder="Name"
                            commentInput="commentInput"
                            value={commentInput}
                            onChange={this.handleChange} />
                        <Button style={{ 'margin-top': '10px' }} content='Comment' labelPosition='right' icon='arrow right' />
                    </Form>
                </div>
            </div>);
    }
}
 
export default TextInput;