"use strict";

module.exports = function(app) {
  // import html-pdf plugin
  let pdf = require("html-pdf");

  // import path
  let path = require("path");

  // import basic ftp
  let ftp = require("basic-ftp")

  // import readable
  const Readable = require('stream').Readable;


  app.post("/liveUrl", async (req, res, done) => {

    let uploadResult;

    console.log("live url started");
    // set cors
    res.setHeader("Access-Control-Allow-Origin", "*");

    // set content type
    res.set("Content-Type", "text/plain");

    // html string to print
    let html = req.body.html

    // get title from request
    let title = req.body.title

    console.log('========== \nhtml content\n=========')

    // create readable
    const readable = new Readable()
    
    // add html to readable
    readable.push(html)

    // eof
    readable.push(null)

    // new ftp client
    let client = new ftp.Client()
    
    // // set verbose
    client.ftp.verbose = true
    try {
        // access ftp server
        await client.access({
            host: "files.000webhost.com",
            user: "itinerary-manager",
            password: "Mj(72hpax5uU#tzs$(xk",
            secure: false
        })

        // upload file and get result
        let result = await client.uploadFrom(readable, `public_html/${title}.html`)
        console.log(result)

        // upload Result 
        uploadResult = `https://itinerary-manager.000webhostapp.com/${title}.html`;
    }
    catch(err) {
        // get error
        console.log(err)
        uploadResult = err.message
    }

    // close ftp client
    client.close()
    // send result as 
    res.send(uploadResult)
    done
  });
};
