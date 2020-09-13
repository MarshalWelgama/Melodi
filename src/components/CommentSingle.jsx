import React, { Component } from 'react';
import 'fontsource-roboto';
import { Button, Card, Comment, Form, Header, CommentGroup, Popup, Icon } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import ta from 'time-ago'


Date.prototype.customFormat = function(formatString){
    var YYYY,YY,MMMM,MMM,MM,M,DDDD,DDD,DD,D,hhhh,hhh,hh,h,mm,m,ss,s,ampm,AMPM,dMod,th;
    YY = ((YYYY=this.getFullYear())+"").slice(-2);
    MM = (M=this.getMonth()+1)<10?('0'+M):M;
    MMM = (MMMM=["January","February","March","April","May","June","July","August","September","October","November","December"][M-1]).substring(0,3);
    DD = (D=this.getDate())<10?('0'+D):D;
    DDD = (DDDD=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"][this.getDay()]).substring(0,3);
    th=(D>=10&&D<=20)?'th':((dMod=D%10)==1)?'st':(dMod==2)?'nd':(dMod==3)?'rd':'th';
    formatString = formatString.replace("#YYYY#",YYYY).replace("#YY#",YY).replace("#MMMM#",MMMM).replace("#MMM#",MMM).replace("#MM#",MM).replace("#M#",M).replace("#DDDD#",DDDD).replace("#DDD#",DDD).replace("#DD#",DD).replace("#D#",D).replace("#th#",th);
    h=(hhh=this.getHours());
    if (h==0) h=24;
    if (h>12) h-=12;
    hh = h<10?('0'+h):h;
    hhhh = hhh<10?('0'+hhh):hhh;
    AMPM=(ampm=hhh<12?'am':'pm').toUpperCase();
    mm=(m=this.getMinutes())<10?('0'+m):m;
    ss=(s=this.getSeconds())<10?('0'+s):s;
    return formatString.replace("#hhhh#",hhhh).replace("#hhh#",hhh).replace("#hh#",hh).replace("#h#",h).replace("#mm#",mm).replace("#m#",m).replace("#ss#",ss).replace("#s#",s).replace("#ampm#",ampm).replace("#AMPM#",AMPM);
  };

  

class CommentSingle extends Component {
    state = { }
    deleteHandler() { //only see if comment is something user posted
        const {comment, userId} = this.props
        if (comment.userId == userId) {
            return (
                <React.Fragment>
                                    <button class="ui black basic button">Delete</button>
                                    <button class="ui orange basic button">Report</button>
                </React.Fragment>
            )
        }
        else {
            return(
                <React.Fragment>
                                    <button class="ui orange basic button">Report</button>
                </React.Fragment>
            )
        }
        
    }
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
        var date = new Date(comment.dateTime);
        const timeStamp = date.customFormat( "#DD# #MMMM# #YYYY# #hh#:#mm# #AMPM#" );
        const relativeTime = ta.ago(date);
        return ( 
            
            <React.Fragment >
                
            <Card style={{'padding':'15px', 'margin':'10px'}} fluid color="grey">
            <Comment>
              <Comment.Avatar as='a' src={comment.userImage} />
              <Comment.Content>
                <Comment.Author as='a' href={"https://open.spotify.com/user/".concat(comment.userId)}>{comment.userName}</Comment.Author>
                <Comment.Metadata>
                <Popup content={timeStamp} trigger={<span>{relativeTime}</span>} />
                <div>
                <Icon name='utensil spoon icon' /> 4
          </div>
                </Comment.Metadata>
                <Comment.Text>{comment.text}</Comment.Text>
                <Comment.Actions >
                <Button  basic icon size='mini'><Icon name='utensil spoon icon' /></Button>
                <Button basic icon size='mini'><Icon name='reply' /></Button>
                <Popup 
                                    trigger={<Button basic icon size='mini'><Icon name='ellipsis horizontal' /></Button>}
                                    content={this.deleteHandler()}
                                    on='click'
                                    hideOnScroll
                                />
                                  
                </Comment.Actions>
                
              </Comment.Content>
              {this.renderReplies()}
              {/* render replies here.  put inside <Coment Group> {all comment rpelies here} </comment group>*/}
              
            </Comment>
            </Card>

            </React.Fragment>
          
         
    
        );
    }
}
 
export default CommentSingle;