# Starting Back End Server

First we will need to export our client ID, Secret then NPM start. 
```
export SPOTIFY_CLIENT_ID=XXXX
export SPOTIFY_CLIENT_SECRET=YYYY
npm start
```
### Info about oAuth
Basicly, the auth will work when you have both React.js App running and our server running. Based on settings placed in spotify developer, once user logins into /login it will redirect to main site with auth token that is then recevied through react.js app. 

This allows us to gather information about our user. Functionality can be tested using  http://localhost:8888/login.