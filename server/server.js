const express = require('express');
const SpotifyWebApi = require('spotify-web-api-node');
const cors = require('cors');
const bodyParser = require('body-parser');
const lyricsFinder = require('lyrics-finder')

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/refresh', (req, res) => {
    const refreshToken = req.body.refresh_token
    const spotifyApi = new SpotifyWebApi({
        redirectUri: 'http://localhost:3000',
        clientId: 'a3309a2a86714ac4b89a19d49da805b7',
        clientSecret: 'c79303862ab24abbaa860a8ac898d88e',
        refreshToken,
    })
    
    spotifyApi
    .refreshAccessToken()
    .then(
        (data) => {
        res.json({
            accessToken: data.body.access_token,
            expiresIn: data.body.expires_in
        })
    })
    .catch((err) => {
        res.sendStatus(400)
    })
})

app.post('/login', (req,res) => {
    const code = req.body.code
    const spotifyApi = new SpotifyWebApi({
        redirectUri: 'http://localhost:3000',
        clientId: 'a3309a2a86714ac4b89a19d49da805b7',
        clientSecret: 'c79303862ab24abbaa860a8ac898d88e'
    })

    spotifyApi
    .authorizationCodeGrant(code)
    .then(data => {
        res.json({
            accessToken: data.body.access_token,
            refreshToken: data.body.refresh_token,
            expiresIn: data.body.expires_in
        })
    })
    .catch((error) => {
        console.log(error)
        res.sendStatus(400)
    })
})

app.get('/lyrics', async (req, res)=> {
    const lyrics = await lyricsFinder(req.query.artist, req.query.track || "No lyrics found")
    res.json( { lyrics })
})

app.listen(3001)