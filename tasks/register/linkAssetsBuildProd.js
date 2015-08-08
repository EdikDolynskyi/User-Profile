module.exports = function (grunt) {
	grunt.registerTask('linkAssetsBuildProd', [
		'sails-linker:prodStylesRelativeJade',
		'sails-linker:prodJsRelativeJade'
	]);
};
