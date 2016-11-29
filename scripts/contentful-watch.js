const debug = require('debug')('contentful-watch');
import now from "performance-now";
import contentful from 'contentful';
import fs from 'fs';
import Promise from 'promise';
const writeFile = Promise.denodeify(fs.writeFile);

/***
 * 
 * 
 *      DEPRECATED
 * 
 * 
 *      Previously was used to automatically download Contentful content locally
 *      through polling.
 * 
 *      LV: Mostly kept around "just in case" we need to return to this approach.
 * 
 * 
 */

function writeJson(file, jsonF) {
    return writeFile(file, JSON.stringify(jsonF, null, 4));
}

const client = contentful.createClient({
    space: 's68ib1kj8k5n',
    accessToken: 'ae31ffc9de0831d887cff9aa3c72d861c323bd09de2a4cafd763c205393976c9'
});

const opts = {
    destination: 'src/contentful.json',
    logging: 'logs/',
    useLogging: false,
    syncPeriod: 60 * 1000, // Every 60 seconds
};

const localStorage = {};

console.log("Starting up contentful-watch...");
client.sync({
        initial: true,
        resolveLinks: true
    })
    .then((response) => {
        return write(response.entries, response);
    }).then((x) => {
        console.log("Loaded. ", localStorage.contentfulEntries.length, "entries up to date");
        console.log("Watching for changes...");
        debug("Waiting for next sync....");
        setTimeout(runIncrementalSync, opts.syncPeriod);
    })
    .catch((err) => console.error("Contentful: Uncaught error in initial sync", err));

// Later....
let consecutiveErrors = 0;
function runIncrementalSync() {
    debug("Incr sync...");
    const start = now();
    const prev = now();
    client.sync({
            nextSyncToken: localStorage.contentfulSyncToken,
            resolveLinks: true
        })
        .then((response) => {
            let oldEntries = localStorage.contentfulEntries;
            const done ={
                numInBlock: response.entries.length + response.deletedEntries.length,
                numModified: 0
            };
            if(done.numInBlock>0){
                console.log("Time since:", now()-prev) && prev == now();
                oldEntries = oldEntries.map((existing) => {
                    const thisId = existing.sys.id;
                    const deletedEntry = response.deletedEntries.find(e=>e.sys.id==thisId);
                    if(deletedEntry){
                        done.numModified++;
                        return null;
                    }
                    const newOne = response.entries.find(e=>e.sys.id==thisId);
                    if(newOne){
                        
                        done.numModified++;
                        return newOne;
                    }
                    return existing;
                }).filter(x=>x?true:false); // Filters out null entries

                return write(oldEntries, response).then(x=>done);
            }else{
                return Promise.resolve(done);
            }
        }).then((x) => {
            const end = now();
            if(x.numInBlock > 0){
                console.log("Detected", x.numInBlock, " and modified", x.numModified, "entries in", (end-start), "ms.", localStorage.contentfulEntries.length, "entries up to date.");
                console.log("Watching for changes...");
            }
            debug("Waiting for next sync....");
            consecutiveErrors = 0;
            setTimeout(runIncrementalSync, opts.syncPeriod);
        })
        .catch((err) => {
            console.error("Contentful: Uncaught error in incremental sync", err);
            consecutiveErrors++; // Exponential backoff
            setTimeout(runIncrementalSync, consecutiveErrors*opts.syncPeriod);
        });
}

function write(entries, resp){
    localStorage.contentfulEntries = entries.sort(sorter);
    localStorage.contentfulSyncToken = resp.nextSyncToken;
    return writeJson(opts.destination, localStorage.contentfulEntries)
        .then(
            x => {
                if(opts.useLogging){
                    return writeJson(opts.logging + 'log-' + new Date().getTime() + '.json', resp.toPlainObject());
                }else{
                    return Promise.resolve(x);
                }
            }
        );
}

function sorter(x,y){
    return x.sys.id.localeCompare(y.sys.id);
}