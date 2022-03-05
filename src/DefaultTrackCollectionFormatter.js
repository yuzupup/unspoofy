/**
 * Formats a track collection into a newline-delimited string, where each track
 * displays its title and artist
 */
class DefaultTrackCollectionFormatter
{
    Format(trackCollection)
    {
        let formattedString = "";
        let tracks = trackCollection.tracks;

        for(let trackIndex = 0; trackIndex < tracks.length; trackIndex++)
        {
            let track = tracks[trackIndex];
            formattedString += `${track.artist} - ${track.title}`;
            if(trackIndex < tracks.length - 1) formattedString += "\n";
        }

        return formattedString;
    }
}

export default DefaultTrackCollectionFormatter;
