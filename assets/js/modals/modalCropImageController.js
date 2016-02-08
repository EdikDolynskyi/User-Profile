var app = require('../angular-app');

app.controller('ModalCropImageCtrl', function($scope, $modalInstance, image, originalFile, $timeout) {
	$scope.image = image;
	$scope.myCroppedImage = '';
	$scope.originalFile = originalFile
	$scope.open = true;

	$scope.ok = function () {
		$('#img-crop').cropper('getCroppedCanvas');

		$('#img-crop').cropper('getCroppedCanvas', {
			width: 160,
			height: 90
		});

		var canvas = $('#img-crop').cropper('getCroppedCanvas');
		var dataUrl = canvas.toDataURL();
		var blob = dataURItoBlob(dataUrl);
		var formData = new FormData();

		formData.append('croppedImage', blob);
		$scope.image = blob;

		var result = {
			image: $scope.image,
			originalFile: $scope.originalFile
		};
		
		$modalInstance.close(result);
		$scope.image = null;
	};

	$scope.cancel = function () {
		$modalInstance.dismiss('cancel');
	};

	$timeout(function () {
	var $previews = $('.preview');

	$('#img-crop').cropper({
		viewMode: 1,
		modal: true,
		dragMode: 'move',
		autoCropArea: 0.65,
		restore: false,
		guides: false,
		highlight: false,
		cropBoxMovable: true,
		cropBoxResizable: true,
		zoomable: false,
		aspectRatio: 2/3,
		build: function (e) {
			var $clone = $(this).clone();
			$clone.css({
				display: 'block',
				width: '100%',
				minWidth: 0,
				minHeight: 0,
				maxWidth: 'none',
				maxHeight: 'none'
			});
			$previews.css({
				width: '100%',
				overflow: 'hidden'
				}).html($clone);
			},
		crop: function (e) {
			var imageData = $(this).cropper('getImageData');
			var previewAspectRatio = e.width / e.height;
			$previews.each(function () {
				var $preview = $(this);
				var previewWidth = $preview.width();
				var previewHeight = previewWidth / previewAspectRatio;
				var imageScaledRatio = e.width / previewWidth;
				$preview.height(previewHeight).find('img').css({
						width: imageData.naturalWidth / imageScaledRatio,
						height: imageData.naturalHeight / imageScaledRatio,
						marginLeft: -e.x / imageScaledRatio,
						marginTop: -e.y / imageScaledRatio
					});
				});
			}
		});
	});

	function dataURItoBlob(dataURI, callback) {
		var byteString = atob(dataURI.split(',')[1]);
		var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]

		var ab = new ArrayBuffer(byteString.length);
		var ia = new Uint8Array(ab);
		for (var i = 0; i < byteString.length; i++) {
			ia[i] = byteString.charCodeAt(i);
		}

		var bb = new Blob([ab]);
		return bb;
	}
});