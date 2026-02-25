require("dotenv").config();
const express=require('express');
const SpotifyWebApi = require('spotify-web-api-node');
const cors=require('cors');
const bodyParser=require('body-parser');
const app=express();

const port=3000;

app.use(bodyParser.urlencoded({"extended" : true}));
app.use(express.json());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://127.0.0.1:5173',
  methods: ["GET", "POST"],
  credentials: true
}));

const scopes = ['playlist-read-private','playlist-read-collaborative','playlist-modify-private','playlist-modify-public',
    'user-read-playback-position','user-top-read','user-read-recently-played',
    'user-read-playback-state','user-modify-playback-state','user-read-currently-playing',
    'user-library-modify','user-library-read','user-read-email','user-read-private']

const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;
const redirectUri = process.env.REDIRECT_URI;

const spotifyApi = new SpotifyWebApi({
  redirectUri: redirectUri,
  clientId: clientId,
  clientSecret: clientSecret,
});

app.get("/login",(req,res)=>{
    const authorizeURL=spotifyApi.createAuthorizeURL(scopes,null,true);
    res.redirect(authorizeURL);
});

app.post("/callback",(req,res)=>{
    const {code}=req.body;
     spotifyApi.authorizationCodeGrant(code).then(
        (data)=>{
            res.send({
                accessToken : data.body.access_token,
                refreshToken : data.body.refresh_token,
                expiresIn : data.body.expires_in
            });
        }
     ).catch((e)=>{
        res.status(400).json({ error: "Invalid client credentials" });
        console.log(e.message)
    });
});

app.post("/refresh",(req,res)=>{
    const {refreshToken}=req.body;
    spotifyApi.setRefreshToken(refreshToken);
    spotifyApi.refreshAccessToken().then(
        (data)=>{
            console.log("Successful token refresh!");
            const accessToken=data.body.access_token;
            const expiresIn = data.body.expires_in;
            res.json({accessToken,expiresIn});
        }
    ).catch((e)=>{
        res.status(401).json({error: "Invalid client credentials"});
        console.log(e.message);
    });
});

app.post("/search",(req,res)=>{
    const {search,accessToken}=req.body;
    spotifyApi.setAccessToken(accessToken);
    spotifyApi.searchTracks(search).then(
        (data)=>res.json(data.body)
    ).catch(e=>{
        console.log(e);
        res.status(400).json({error : "Track not found!"});
    })
});

app.listen(port,()=>console.log("App is listening on port",port));