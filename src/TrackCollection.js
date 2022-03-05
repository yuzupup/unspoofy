import Track from './Track.js';

/** Represents an unordered collection of tracks */
class TrackCollection
{
    constructor()
    {
        this.tracks = [];
    }

    AddTrack(artist, title)
    {
        this.tracks.push(new Track(artist, title));
    }
}
export default TrackCollection;
