/**
 * Concatenate files.
 *
 * ---------------------------------------------------------------
 *
 * Concatenates files javascript and css from a defined array. Creates concatenated files in
 * .tmp/public/contact directory
 * [concat](https://github.com/gruntjs/grunt-contrib-concat)
 *
 * For usage docs see:
 * 		https://github.com/gruntjs/grunt-contrib-concat
 */
module.exports = function(grunt) {

	grunt.config.set('concat', {
		jsLibs: {
			src: require('../pipeline').jsLibsToInject,
			dest: '.tmp/public/concat/libs.js'
		},

		cssLibs: {
			src: require('../pipeline').cssLibsToInject,
			dest: '.tmp/public/concat/libs.css'
		},
		js: {
			src: require('../pipeline').jsFilesToInject,
			dest: '.tmp/public/concat/production.js'
		},
		css: {
			src: require('../pipeline').cssFilesToInject,
			dest: '.tmp/public/concat/production.css'
		},
		jsLibs: {
			src: require('../pipeline').jsLibsToInject,
			dest: '.tmp/public/concat/libs.js'
		},

		cssLibs: {
			src: require('../pipeline').cssLibsToInject,
			dest: '.tmp/public/concat/libs.css'
		}
	});

	grunt.loadNpmTasks('grunt-contrib-concat');
};
