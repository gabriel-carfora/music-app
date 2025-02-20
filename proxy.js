const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const REDIRECT_URI = process.env.SPOTIFY_REDIRECT_URI;
const PORT = 5000;

const spotifyApi = axios.create({
  baseURL: 'https://accounts.spotify.com/api',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization': `Basic ${Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')}`
  }
});

async function getAccessToken() {
  try {
    const params = new URLSearchParams({
      grant_type: 'client_credentials'
    });

    const response = await spotifyApi.post('/token', params);
    return response.data.access_token;
  } catch (error) {
    console.error('Error getting access token:', error);
    throw error;
  }
}

const app = express();
app.use(cors());
app.use(express.json());


app.post('/api/token', async (req, res) => {
  const { code, code_verifier, redirect_uri } = req.body;

  if (!code_verifier) {
    console.error('Missing code_verifier in request body');
    return res.status(400).json({
      error: 'invalid_request',
      error_description: 'code_verifier required'
    });
  }

  try {
    const params = new URLSearchParams({
      grant_type: 'authorization_code',
      code,
      redirect_uri,
      client_id: CLIENT_ID,
      code_verifier,
    });

    const response = await spotifyApi.post('/token', params);
    res.json(response.data);
  } catch (error) {
    console.error('Full error:', error);
    console.error('Error response:', error.response?.data);
    res.status(error.response?.status || 500).json(error.response?.data || {
      error: 'internal_server_error',
      error_description: error.message
    });
  }
});

app.get('/api/auth-url', (req, res) => {
  const scope = 'user-read-email user-top-read playlist-read-private';
  const state = Math.random().toString(36).substring(7);

  const authParams = new URLSearchParams({
    response_type: 'code',
    client_id: CLIENT_ID,
    scope,
    redirect_uri: REDIRECT_URI,
    state,
  });

  const authUrl = `https://accounts.spotify.com/authorize?${authParams.toString()}`;
  res.json({ url: authUrl });
});

app.post('/api/test', (req, res) => {
  res.json({
    received: req.body,
    bodyType: typeof req.body,
    hasCodeVerifier: 'code_verifier' in req.body
  });
});

app.get('/api/spotify/search', async (req, res) => {
  try {
    const token = await getAccessToken();
    const response = await axios.get('https://api.spotify.com/v1/search', {
      params: req.query,
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    res.json(response.data);
  } catch (error) {
    console.error('Search error:', error);
    res.status(error.response?.status || 500).json({
      error: 'search_error',
      error_description: error.message
    });
  }
});

app.get('/api/spotify/albums/:albumId', async (req, res) => {
  console.log(req.params.albumId)
  try {
    const token = await getAccessToken();
    const response = await axios.get(`https://api.spotify.com/v1/albums/${req.params.albumId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    res.json(response.data);

  } catch (error) {
    console.error('Album details error:', error);
    res.status(error.response?.status || 500).json({
      error: 'album_error',
      error_description: error.message
    });
  }
});

app.get('/api/spotify-token', async (req, res) => {
  try {
    const token = await getAccessToken();
    res.json({ access_token: token });
  } catch (error) {
    console.error('Token error:', error);
    res.status(error.response?.status || 500).json(error.response?.data || {
      error: 'token_error',
      error_description: error.message
    });
  }
});

app.get('/api/spotify/albums/:albumId/tracks', async (req, res) => {
  try {
    const token = await getAccessToken();

    const albumTracksResponse = await axios.get(`https://api.spotify.com/v1/albums/${req.params.albumId}/tracks`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    const trackIds = albumTracksResponse.data.items.map(track => track.id);

    const tracksResponse = await axios.get('https://api.spotify.com/v1/tracks', {
      params: { ids: trackIds.join(',') },
      headers: { Authorization: `Bearer ${token}` }
    });

    console.log('Full tracks data:', tracksResponse.data);

    res.json(tracksResponse.data.tracks);
  } catch (error) {
    console.error('Error:', error.response?.data || error.message);
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log('Proxy server running on https://devproxy.carfora.xyz');
});