/**
 * FileController
 *
 * @description :: Server-side logic for managing files
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var path = require('path');
var mime = require('mime');
var fs = require('fs');
var filesFolder = __dirname + '../../../upload';

module.exports = {
    upload: function (req, res) {
        if (req.method === 'GET')
            return res.json({'status': 'GET not allowed'});

        var uploadFile = req.file('file');

        uploadFile.upload(
            {
                dirname: filesFolder
            },
            function (err, files) {
                if (err) return res.serverError(err);

                var filepath = files[0].fd;

                res.json({status: 200, file: path.basename(filepath)});
            }
        );
    },
    get: function (req, res) {
        var filename = path.basename(req.url);
        var filepath = path.join(filesFolder, filename);

        fs.exists(filepath, function (exists) {
            if (!exists) {
                res.statusCode = 404;
                res.end();
                return;
            }
            var mimetype = mime.lookup(filepath);
            res.setHeader('Content-Type', mimetype);

            var filestream = fs.createReadStream(filepath);
            filestream.pipe(res);
        });
    },

    downloadFile: function(req, res){
        downloadService.downloadFile(req.body.url, req.body.fileName, function(data){
            res.send(data)
        })
    }
};


