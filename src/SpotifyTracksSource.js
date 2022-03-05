import { parse } from 'node-html-parser';
import axios from 'axios';
import Track from './Track.js';

const InputType =
{
    PLAYLIST_ID: "PlaylistID",
    URL: "URL",
    UNSUPPORTED: "UNSUPPORTED"
}

class SpotifyTracksSource
{
    async GetTracks(source)
    {
        let inputType = this.#DetermineInputType(source);
        switch(inputType)
        {
            case InputType.PLAYLIST_ID:
                return await this.#GetTracksUsingPlaylistID(source);
            case InputType.URL:
                return await this.#GetTracksUsingURL(source);
        }
        throw new Error("Provided source could not be turned into a playlist URL. Please pass either an URL or Spotify playlist ID.");
    }

    #DetermineInputType(input)
    {
        if(typeof(input) != 'string')
        {
            return InputType.UNSUPPORTED;
        }

        if(input.startsWith("http"))
        {
            return InputType.URL;
        }

        return InputType.PLAYLIST_ID;
    }

    async #GetTracksUsingPlaylistID(playlistID)
    {
        return await this.GetTracksUsingURL(`https://open.spotify.com/playlist/${playlistId}`);
    }

    async #GetTracksUsingURL(url)
    {
        let res = await axios.get(url)
        const htmlRoot = parse(res.data);
        let tracks = [];

        let trackElements = htmlRoot.querySelectorAll('[data-testid=track-row]');
        trackElements.forEach((el) =>
        {
            let anchors = el.querySelectorAll('a');
            let track = null;
            let artist = null;

            anchors.forEach((anchor) =>
            {
                let href = anchor.getAttribute("href");
                if(href.includes("track"))
                {
                    track = anchor.innerHTML;
                }
                if(href.includes("artist"))
                {
                    artist = anchor.innerHTML;
                }
            });

            if(track !== null && artist !== null)
            {
                tracks.push(new Track(artist, track));
            }

        });

        return tracks;
    }
}

export default SpotifyTracksSource;
