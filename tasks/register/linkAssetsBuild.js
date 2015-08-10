module.exports = function (grunt) {
	grunt.registerTask('linkAssetsBuild', [
		'sails-linker:devStylesRelativeJade',
		'sails-linker:devJsRelativeJade'
	]);
};
