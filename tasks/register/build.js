module.exports = function (grunt) {
	grunt.registerTask('build', [
		'compileAssets',
		'linkAssetsBuild',
		'browserify',
		'clean:build',
		'copy:build'
	]);
};
