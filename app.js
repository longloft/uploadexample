var express = require("express");
var multer = require('multer');
var storage = multer.memoryStorage();
var upload = multer({ storage: storage, limits: { fileSize: 1024 * 1024 * 50 } });
var bodyParser = require('body-parser');

var app = express();
app.use(express.logger());

// Configuration

app.configure(function() {
    app.set('views', __dirname);
    app.use(bodyParser.json({ limit: '100gb' }));
    app.use(bodyParser.urlencoded({ limit: '100gb', extended: true }));
    app.use(express.static(__dirname));
    app.use(app.router);
    app.engine('html', require('ejs').renderFile);
});

app.get('/*', function(request, response) {
    response.render('index.html');
});

app.post('/api/v1/files', upload.single('file'), function(request, response) {
    var json = JSON.parse(request.body.data);
    var file = request.file;
    return response.json(json);
});

var port = process.env.PORT || 7000;
app.listen(port, function() {
    console.log("Listening on " + port);
});