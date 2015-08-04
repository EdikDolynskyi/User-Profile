module.exports = function (grunt) {
	grunt.registerTask('linkAssets', [
		'sails-linker:devStylesRelativeJade',
		'sails-linker:devJsRelativeJade'
	]);
};
