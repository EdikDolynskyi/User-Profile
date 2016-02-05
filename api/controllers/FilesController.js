/**
 * FileController
 *
 * @description :: Server-side logic for managing files
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var im = require('imagemagick');
var path = require('path');
var mime = require('mime');
var fs = require('fs');
var filesFolder = __dirname + '../../../upload';

module.exports = {
	upload: function (req, res) {
		if (req.method === 'GET')
			return res.json({'status': 'GET not allowed'});

		var uploadFile = req.file('file');
		uploadFile.upload({
				dirname: filesFolder
			},
			function (err, files) {
				if (err) return res.serverError(err);

				var filepath = files[0].fd;
				//var write = fs.createWriteStream(filepath + '_resized');

				  im.crop({
					  srcPath: filepath,
					  dstPath: filepath + '_resized',
					  width: 100,
					  height: 100,
					  quality: 0.5,
					  gravity: "North"
					}, function(err, stdout, stderr){
					  // foo
					});

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


