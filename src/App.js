import "./App.css";
import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
//import DisplaySpeech from "./display_fetchspeech";
import VoiceRSS from "./voicerss";
import DisplaySpeech from "./display_fetchspeech";
import GetText from "./GetTextApi";

const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;

function App() {
  const [user, setUser] = useState({});

  const handleCallbackResponse = (response) => {
    console.log(`Encoded JWT ID token: ${response.credential}`);
    const userObject = jwt_decode(response.credential);
    console.log(userObject);
    setUser(userObject);
    document.getElementById("signInDiv").hidden = true;
  };
  const handleSignOut = (e) => {
    setUser({});
    document.getElementById("signInDiv").hidden = false;
  };

  useEffect(() => {
    const google = window.google;
    /* gobal google */
    google.accounts.id.initialize({
      client_id: GOOGLE_CLIENT_ID,
      callback: handleCallbackResponse,
    });

    google.accounts.id.renderButton(document.getElementById("signInDiv"), {
      theme: "outline",
      size: "large",
    });
    google.accounts.id.prompt();
  }, []);

  // if no user, show sign-in button
  // if user, show log-out button
  return (
    <div className="App">
      <div id="signInDiv"></div>
      {Object.keys(user).length !== 0 && (
        <button onClick={(e) => handleSignOut(e)}>Sign Out</button>
      )}
      {user && (
        <div>
          <img src={user.picture}></img>
          <h3>{user.name}</h3>
          <GetText />
        </div>
      )}
    </div>
  );
}

export default App;
