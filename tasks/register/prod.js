module.exports = function (grunt) {
	grunt.registerTask('prod', [
		'compileAssets',
		'concat',
		'uglify',
		'cssmin',
		'sails-linker:prodJsRelativeJade',
		'sails-linker:prodStylesRelativeJade'
	]);
};
