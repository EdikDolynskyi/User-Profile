var app = require('../angular-app');

app.factory('uploadService', function(Upload, $q, prefix){
	return {
		upload: upload,
        uploadMultipleFiles: uploadMultipleFiles
	};

	function upload(file, callback){
		if (file) {
            Upload.upload({
                //url: prefix + '/api/files/upload',
                url: '/profile/api/files/upload',
                file: file
            }).success(function (data) {
                //var fileSrc = '/api/files/get/' + data.file;
                var fileSrc = '/profile/api/files/get/' + data.file;
                callback(fileSrc);
            }).error(function (data, status) {
                console.log('error status: ' + status);
            })
        }
	}

    function uploadMultipleFiles(files, callback){
        var promises = [];

        if (files) {
            angular.forEach(files, function(file){
                var promise = Upload.upload({
                    //url: prefix + '/api/files/upload',
                    url: '/profile/api/files/upload',
                    file: file
                });

                promises.push(promise);
            });

            $q.all(promises).then(function(res) {
                var files = [];

                for(var i = 0; i < res.length; i++) {
                    //var file = '/api/files/get/' + res[i].data.file;
                    var file = '/profile/api/files/get/' + res[i].data.file;
                    files.push(file);
                }

                callback(files);
            })
        } else {
            callback(null);
        }
    }
});