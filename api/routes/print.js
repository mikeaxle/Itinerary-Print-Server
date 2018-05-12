'use strict';

module.exports = function(app) {

    // import html-pdf plugin
    var pdf = require('html-pdf');
    
    // import path
    var path = require('path');
    
    // set base path
    let base = "file://" + path.resolve(path.join(__dirname, '..', '/views/')) + '/';
    
             // pdf document size options
    	const options = {
    		base: base,
        	type: 'pdf',
        	border: {
            	"top": "0mm",      
            	"right": "0mm",
            	"bottom": "0mm",
            	"left": "0mm"
          	},
          	header: {
            	height:'35mm',
            	// contents: header,
          	},
          footer: {
          //  contents: footer,
          	}
    	};
        

    
    app.post('/print-pdf', (req,res, done) => {

        console.log('print started');

        // set cors
        res.setHeader('Access-Control-Allow-Origin', '*');
    
        // set content type and file name
        res.set('Content-Disposition', 'attachment; filename=itinerary.pdf');
        res.set('Content-Type', "application/pdf");
    
        // html string to print
        const html = req.body.html;

        try {
            pdf.create(html, options).toStream(function(err, stream){
                stream.pipe(res);
              });
        } catch (error) {
            alert(error);
        }
        done;
  });
};