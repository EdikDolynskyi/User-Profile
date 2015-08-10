module.exports = function (grunt) {
	grunt.registerTask('buildProd', [
		'compileAssets',
		'linkAssetsBuildProd',
		'clean:build',
		'copy:build'
	]);
};
