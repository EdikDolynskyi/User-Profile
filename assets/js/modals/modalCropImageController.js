var app = require('../angular-app');

app.controller('ModalCropImageCtrl', function($scope, $modalInstance, image, originalFile) {
	$scope.image = image;
	$scope.myCroppedImage = '';
	$scope.originalFile = originalFile

	$scope.ok = function () {
		var result = {
			image: $scope.image,
			originalFile: $scope.originalFile
		};
		
		$modalInstance.close(result);
	};

	$scope.cancel = function () {
		$modalInstance.dismiss('cancel');
	};
});