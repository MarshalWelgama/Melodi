# Starting Back End Server

First we will need to export our client ID, Secret then NPM start.

```
export SPOTIFY_CLIENT_ID=XXXX
export SPOTIFY_CLIENT_SECRET=YYYY
npm start
```

### Info about oAuth

Basicly, the auth will work when you have both React.js App running and our server running. Based on settings placed in spotify developer, once user logins into /login it will redirect to main site with auth token that is then recevied through react.js app.

This allows us to gather information about our user. Functionality can be tested using http://localhost:8888/login.

### Endpoints

All routes start with /api.

#### /users

##### Get current user - /current

returns

```
{
    userId: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    countryCode: { type: String, required: true },
    image: { type: String, required: false },
    link: { type: String, required: true },
}
```

##### Get specific user by id - /:id

returns

```
{
    userId: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    countryCode: { type: String, required: true },
    image: { type: String, required: false },
    link: { type: String, required: true },
}
```

##### Updating a user's name, email, countryCode, image, link - PATCH /:id

Put whatever info you want to change in the query string. Any info not provided will not be changed.

##### Delete a user - DELETE /:id

#### /songs

##### Get current song - /current

returns

```
{
    songId: { type: String, required: true },
    songName: { type: String, required: true },
    artistsName: { type: Array, required: true },
    albumName: { type: String, required: true },
    albumArt: { type: String, required: true },
    previewURL: { type: String, required: false },
    comments: { type: Array, required: true, default: [] },
}
```

Note that comments will be an empty array here to save computations. To get actual song comments, you must use the specific songId route

##### Get specific song - /:id

returns

```
{
    songId: { type: String, required: true },
    songName: { type: String, required: true },
    artistsName: { type: Array, required: true },
    albumName: { type: String, required: true },
    albumArt: { type: String, required: true },
    previewURL: { type: String, required: false },
    comments: { type: Array, required: true, default: [] },
}
```

comments will be an empty array if there are none existing.

#### /comments

##### Create a comment - POST /

On the song you wish to comment on, provide the text of the comment and the songId in a query string (the user's ID will be automatically detected)

##### Update a comment (i.e. like or change text) - PATCH /:id

Provide the text to change or provide a non-empty votes field to upvote a comment by one.

##### Get a comment - GET /:id

returns

```
{
    text: { type: String, required: true },
    votes: { type: Number, required: true, default: 0 },
    userId: { type: String, required: true },
    songId: { type: String, required: true },
}
```

##### Delete a comment - DELETE /:id
