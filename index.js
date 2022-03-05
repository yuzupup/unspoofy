import SpotifyTracksSource from "./src/SpotifyTracksSource.js"

const args = process.argv.slice(2);
const source = new SpotifyTracksSource();

let input = args[0];
let tracks = await source.GetTracks(input);
console.log(tracks);
