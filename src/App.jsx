import React from "react";
import { useState } from "react";
import './App.css'
import Axios from 'axios';

function App() {
  const [artist, setArtist] = useState("");
  const [lyrics, setLyrics] = useState("");
  const [song, setSong] = useState("");

  function searchLyrics() {
    if (artist === "" || song === "") {
      return;
    }
    Axios.get(`https://api.lyrics.ovh/v1/${artist}/${song}`)
      .then((res) => {
        console.log(res.data.lyrics);
        setLyrics(res.data.lyrics);
      })
      .catch((error) => {
        console.log("Error fetching Lyrics:", error);
        setLyrics("Lyrics not found. Please check your input.");
      });
  }

  const handleArtistChange = (e) => {
    setArtist(e.target.value);
  };

  const handleSongChange = (e) => {
    setSong(e.target.value);
  };

  return (
    <div className="App">
      <h1>Lyrics Finder</h1>
      <input
        type="text"
        placeholder="Artist"
        value={artist}
        onChange={handleArtistChange}
        className="inp"
      />
      <input
        type="text"
        placeholder="Song"
        value={song}
        onChange={handleSongChange}
        className="inp"
      />
      <button onClick={searchLyrics} className="btn">Search</button>
      <div>
        {lyrics && (
          <div>
            <h2>{`${artist} - ${song}`}</h2>
            <pre>{lyrics}</pre>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
