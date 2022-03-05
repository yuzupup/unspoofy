#! /usr/bin/env node
import SpotifyTracksSource from "./src/SpotifyTracksSource.js"
import DefaultTrackCollectionFormatter from "./src/DefaultTrackCollectionFormatter.js"
import HTMLTrackCollectionFormatter from "./src/HTMLTrackCollectionFormatter.js"
import minimist from 'minimist';
let argv = minimist(process.argv.slice(2));

const source = new SpotifyTracksSource();

let input = argv._[0];
let formatterArgument = argv['f'];
let trackCollection = await source.GetTrackCollectionFromPlaylist(input);
let formatter;

switch(formatterArgument)
{
    case 'h':
    case 'html':
        formatter = new HTMLTrackCollectionFormatter();
        break;
    case 'd':
    case 'default':
    default:
        formatter = new DefaultTrackCollectionFormatter();
        break;
}

process.stdout.write(formatter.Format(trackCollection));
