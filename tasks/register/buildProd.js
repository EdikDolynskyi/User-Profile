module.exports = function (grunt) {
	grunt.registerTask('buildProd', [
		'compileAssets',
		'concat',
		'browserify',
		'cssmin',
		'linkAssetsBuildProd',
		'clean:build',
		'copy:build'
	]);
};
