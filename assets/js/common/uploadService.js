var app = require('../angular-app');

app.factory('uploadService', function(Upload){
    var prefix = window.location.pathname;
	return {
		upload:upload
	};

	function upload(file, callback){
		if (file) {
            Upload.upload({
                url: prefix + 'api/files/upload',
                file: file
            }).success(function (data) {
                var fileSrc = prefix + 'api/files/get/' + data.file;
                callback(fileSrc);
            }).error(function (data, status) {
                console.log('error status: ' + status);
            })
        }
	};
});