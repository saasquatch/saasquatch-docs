"use strict";

var debug = require('debug')('contentful-watch');
var now = require("performance-now");

var contentful = require('contentful');
var fs = require('fs');
var Promise = require('promise');
var writeFile = Promise.denodeify(fs.writeFile);

function writeJson(file, jsonF) {
    return writeFile(file, JSON.stringify(jsonF, null, 4));
}

var client = contentful.createClient({
    space: 's68ib1kj8k5n',
    accessToken: 'ae31ffc9de0831d887cff9aa3c72d861c323bd09de2a4cafd763c205393976c9'
});

var opts = {
    destination: 'src/contentful.json',
    logging: 'logs/',
    useLogging: false,
    syncPeriod: 5 * 1000,
};

var localStorage = {};

console.log("Starting up contentful-watch...");
client.sync({
        initial: true
    })
    .then((response) => {
        return write(response.entries, response);
    }).then((x) => {
        console.log("Loaded. ", localStorage.contentfulEntries.length, "entries up to date");
        console.log("Watching for changes...");
        debug("Waiting for next sync....");
        setTimeout(runIncrementalSync, opts.syncPeriod);
    })
    .catch((err) => console.error("Uncaught error", err));

// Later....
function runIncrementalSync() {
    debug("Incr sync...");
    var start = now();
    var prev = now();
    client.sync({
            nextSyncToken: localStorage.contentfulSyncToken
        })
        .then((response) => {
            var oldEntries = localStorage.contentfulEntries;
            var done ={
                numInBlock: response.entries.length + response.deletedEntries.length,
                numModified: 0
            };
            if(done.numInBlock>0){
                console.log("Time since:", now()-prev) && prev == now();
                oldEntries = oldEntries.map((existing) => {
                    var thisId = existing.sys.id;
                    var deletedEntry = response.deletedEntries.find(e=>e.sys.id==thisId);
                    if(deletedEntry){
                        done.numModified++;
                        return null;
                    }
                    var newOne = response.entries.find(e=>e.sys.id==thisId);
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
            var end = now();
            if(x.numInBlock > 0){
                console.log("Detected", x.numInBlock, " and modified", x.numModified, "entries in", (end-start), "ms.", localStorage.contentfulEntries.length, "entries up to date.");
                console.log("Watching for changes...");
            }
            debug("Waiting for next sync....");
            setTimeout(runIncrementalSync, opts.syncPeriod);
        })
        .catch((err) => console.error("Uncaught error", err));
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