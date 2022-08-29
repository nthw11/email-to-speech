import React, { useEffect } from 'react'
import axios from 'axios'
const API_KEY = process.env.REACT_APP_GOOGLE_API_KEY

const CLIENT_ID = '<YOUR_CLIENT_ID>';
// const API_KEY = '<YOUR_API_KEY>';

const SCOPES = 'https://www.googleapis.com/auth/gmail.readonly';
const DISCOVERY_DOC =
'https://www.googleapis.com/discovery/v1/apis/gmail/v1/rest';
let tokenClient;
let gapiInited = false;
let gisInited = false;

const Home = () => {

  const gapi = useEffect(()=> axios.get("https://apis.google.com/js/api.js"))
  const google = useEffect(()=> axios.get("https://accounts.google.com/gsi/client"))
  
  const gapiLoaded = () => {
    gapi.load('client', intializeGapiClient);
  }

  const maybeEnableButtons = () => {
    if (gapiInited && gisInited) {
      document.getElementById('authorize_button').style.visibility =
        'visible';
    }
  }

  const intializeGapiClient= async () => {
    await gapi.client.init({
      apiKey: API_KEY,
      discoveryDocs: [DISCOVERY_DOC],
    });
    gapiInited = true;
    maybeEnableButtons();
  }

  // const gisLoaded = () => {
  //   tokenClient = google.accounts.oauth2.initTokenClient({
  //     client_id: CLIENT_ID,
  //     scope: SCOPES,
  //     callback: '', // defined later
  //   });
  //   gisInited = true;
  //   maybeEnableButtons();
  // }

  const listLabels = async () => {
    let response;
    try {
      response = await gapi.client.gmail.users.labels.list({
        userId: 'me',
      });
    } catch (err) {
      document.getElementById('content').innerText = err.message;
      return;
    }
    const labels = response.result.labels;
    if (!labels || labels.length == 0) {
      document.getElementById('content').innerText = 'No labels found.';
      return;
    }
    // Flatten to string to display
    const output = labels.reduce(
      (str, label) => `${str}${label.name}\n`,
      'Labels:\n'
    );
    document.getElementById('content').innerText = output;
  }

  const handleSignoutClick = () =>{
    const token = gapi.client.getToken();
    if (token !== null) {
      google.accounts.oauth2.revoke(token.access_token);
      gapi.client.setToken('');
      document.getElementById('content').innerText = '';
      document.getElementById('authorize_button').innerText = 'Authorize';
      document.getElementById('signout_button').style.visibility = 'hidden';
    }
  }


  const handleAuthClick = () => {
    tokenClient.callback = async (resp) => {
      if (resp.error !== undefined) {
        throw resp;
      }
      document.getElementById('signout_button').style.visibility =
        'visible';
      document.getElementById('authorize_button').innerText = 'Refresh';
      await listLabels();
    };

    if (gapi.client.getToken() === null) {
      // Prompt the user to select a Google Account and ask for consent to share their data
      // when establishing a new session.
      tokenClient.requestAccessToken({ prompt: 'consent' });
    } else {
      // Skip display of account chooser and consent dialog for an existing session.
      tokenClient.requestAccessToken({ prompt: '' });
    }
  }
  return (
    <div>
      <h2>Home</h2>
      <button id="authorize_button" onclick={handleAuthClick}>Authorize</button>
    <button id="signout_button" onclick={handleSignoutClick}>Sign Out</button>

    </div>
  )
}

export default Home