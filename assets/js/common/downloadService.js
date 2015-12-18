var app = require('../angular-app');

app.factory('downloadService', function($resource){
    return {
        downloadFile : downloadFile
    };

    function downloadFile(obj, callback) {
        var newFile = $resource('downloadimg', null, {'post': { method:'POST' }});
        newFile.post(obj, function(res) {
            console.log(res);
            callback();
        }, function(err){
            console.log(err);
        });
    }
});