import { parse } from 'node-html-parser';
import axios from 'axios';
import TrackCollection from './TrackCollection.js';

/** Support input types for this source */
const InputType =
{
    PLAYLIST_ID: "PlaylistID",
    URL: "URL",
    UNSUPPORTED: "UNSUPPORTED"
}

/** Builds a TrackCollection from a Spotify playlist */
class SpotifyTracksSource
{
    /**
     * Returns a TrackCollection for the provided Spotify playlist.
     * Source can either be a playlist ID or playlist URL
     */
    async GetTrackCollectionFromPlaylist(source)
    {
        let inputType = this.#DetermineInputType(source);
        switch(inputType)
        {
            case InputType.PLAYLIST_ID:
                return await this.#GetTrackCollectionUsingPlaylistID(source);
            case InputType.URL:
                return await this.#GetTrackCollectionUsingURL(source);
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

    async #GetTrackCollectionUsingPlaylistID(playlistID)
    {
        return await this.GetTrackCollectionUsingURL(`https://open.spotify.com/playlist/${playlistId}`);
    }

    async #GetTrackCollectionUsingURL(url)
    {
        let res = await axios.get(url);
        let trackCollection = new TrackCollection();
        const htmlRoot = parse(res.data);

        let trackElements = htmlRoot.querySelectorAll('[data-testid=track-row]');
        trackElements.forEach((el) =>
        {
            let anchors = el.querySelectorAll('a');
            let track = null;
            let artists = [];

            anchors.forEach((anchor) =>
            {
                let href = anchor.getAttribute("href");
                if(href.includes("track"))
                {
                    track = anchor.innerHTML;
                }
                if(href.includes("artist"))
                {
                    artists.push(anchor.innerHTML);
                }
            });

            if(track !== null && artists.length > 0)
            {
                trackCollection.AddTrack(artists.join(', '), track);
            }

        });

        return trackCollection;
    }
}

export default SpotifyTracksSource;
