import React, { useEffect, useState } from 'react';
import SpotifyPlayer from 'react-spotify-web-playback'


function Player({ accessToken, trackUri }) {
    const [play, setPlay] = useState(false);

    useEffect(() => setPlay(true), [trackUri])
      
    if (!accessToken) return null
    return (
        <SpotifyPlayer 
        token={accessToken}
        showSaveIcon
        uris={trackUri ? [trackUri] : []}
        play={play}
        callback={state => { 
            if(!state.isPlaying) setPlay(false);
        }}/>
    )
  }
  
  export default Player;