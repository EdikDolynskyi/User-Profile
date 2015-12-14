module.exports = function (grunt) {
	grunt.registerTask('prod', [
		'compileAssets',
		'sails-linker:prodJsRelativeJade',
		'sails-linker:prodStylesRelativeJade'
	]);
};
