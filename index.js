import SpotifyTracksSource from "./src/SpotifyTracksSource.js"
import DefaultTrackCollectionFormatter from "./src/DefaultTrackCollectionFormatter.js"

const args = process.argv.slice(2);
const source = new SpotifyTracksSource();

let input = args[0];
let trackCollection = await source.GetTrackCollectionFromPlaylist(input);
let formatter = new DefaultTrackCollectionFormatter();
console.log(formatter.Format(trackCollection));
