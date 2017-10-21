const fs = require('fs');

const filename = 'urls.txt';
fs.readFile(filename, 'utf8', function(err, data) {
    if (err) throw err;
    console.log('OK: ' + filename);

    const urls = data.trim().split('\n');
    const commands = ['#!/bin/bash'];

    urls.forEach((url, index) => {
        commands.push(`touch pages/file${index}.txt && curl ${url.trim()} > pages/file${index}.txt`);
    });

    fs.writeFile("generate_htmls.sh", commands.join('\n'), function(err) {
        if(err) {
            return console.log(err);
        }

        console.log("The file was saved!");
    });
});
