/** Represents a single track of music */
class Track
{
    constructor(artist, title)
    {
        this.artist = artist;
        this.title = title;
    }

    toString()
    {
        return `${this.artist} - ${this.title}`;
    }
}

export default Track;
