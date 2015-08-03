module.exports = function (grunt) {
	grunt.registerTask('compileAssets', [
		'clean:dev',
		'jst:dev',
		'less:dev',
		'copy:dev',
		'coffee:dev',
		'stylus:dev',
		'jade:dev'
	]);
};
