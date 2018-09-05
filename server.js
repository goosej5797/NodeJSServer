var http = require("http");
var path = require("path");
var fs = require("fs");
var url = require('url');

fs.readFile("config/info.json", function(err, data){
    if(err){
        console.log(err);
    }else{
        var parsedInfo = JSON.parse(data);
        setUpServer(parsedInfo);
    }
});

//Creates the server that listens for any calls
//on the URL: 127.0.0.1 and on the port 8000.
function setUpServer(serverInfo){
    console.log("Starting web server at " + serverInfo["serverUrl"] + ":" + serverInfo["port"]);
    http.createServer( function(req, res) {
        var parsedUrl = url.parse(req.url, true);
        if(path.extname(parsedUrl.href)){
            serveFileCall(parsedUrl, res);
        }else{
            serveApiCall(parsedUrl, res);
        }
    }).listen(serverInfo["port"], serverInfo["serverUrl"]);
}

function serveApiCall(parsedUrl, res){
    //Initial check for first part of string
    //to make sure it is an actual API call
    if(parsedUrl.pathname.substring(0,4) == '/api'){
        //Call specific API...If API doesn't exist
        //a 500 is returned to the sender
        apiCall(parsedUrl, res);
    }
    else{
        res.writeHead(500);
        res.end();
    }
    
}

function serveFileCall(parsedUrl, res){
    var localPath = __dirname + parsedUrl.pathname;
    fs.exists(localPath, function(exists) {
        if(exists) {
            console.log("Serving file: " + localPath);
            getFile(localPath, res);
        } else {
            console.log("File not found: " + localPath);
            res.writeHead(404);
            res.end();
        }
    });
}

function getFile(localPath, res) {
	fs.readFile(localPath, function(err, contents) {
		if(!err) {
			res.statusCode = 200;
			res.end(contents);
		} else {
			res.writeHead(500);
			res.end();
		}
	});
}

function apiCall(parsedUrl, res){
    switch(parsedUrl.pathname.substring(4)){                                      
        case "/search":   //Example parsedUrl.query gives a list of all params
            search(parsedUrl.query, res);
            break;
        default:
            res.writeHead(500);
            res.end();
    }
}

function search(query, res){
    var name = query["name"];
    res.writeHead(200);
    res.write('<h1>API was called by ' + name + '</h1>');
    res.end();
}

//ORIGINAL CODE...REPLACED TO ALLOW ALL EXTENSIONS
// validMimeType = validExtensions[ext] != undefined;
//
// if (validMimeType) {
//     localPath += filename;
//     fs.exists(localPath, function(exists) {
//         if(exists) {
//             console.log("Serving file: " + localPath);
//             getFile(localPath, res, mimeType);
//         } else {
//             console.log("File not found: " + localPath);
//             res.writeHead(404);
//             res.end();
//         }
//     });
// } else {
//     console.log("Invalid file extension detected: " + ext + " (" + filename + ")")
//     res.writeHead(404);
//     res.end();
// }