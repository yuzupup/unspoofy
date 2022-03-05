/** Outputs a TrackCollection as an HTML page */
class HTMLTrackCollectionFormatter
{
    #html;
    constructor()
    {
        this.#html = "<!DOCTYPE html><html><head></head><body>";
    }

    Format(trackCollection)
    {
        trackCollection.tracks.forEach((track) =>
        {
            this.#AppendTrackListing(track);
        });
        this.#AppendHTML("</body>");
        this.#AppendHTML("</html>");

        return this.#html;
    }

    #AppendTrackListing(track)
    {
        this.#AppendHTML("<div class='track'>");
        this.#AppendHTML(`<span class='artist'>${track.artist}</span>`);
        this.#AppendHTML(`<span class='seperator'>-</span>`);
        this.#AppendHTML(`<span class='title'>${track.title}</span>`);
        this.#AppendHTML(` <a href='https://www.youtube.com/results?search_query=${encodeURIComponent(track.toString())}'>YouTube</a>`);
        this.#AppendHTML("</div>");
    }

    #AppendHTML(htmlToAppend)
    {
        this.#html += htmlToAppend;
    }
}
export default HTMLTrackCollectionFormatter;
