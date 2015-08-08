/**
 * Copy files and folders.
 *
 * ---------------------------------------------------------------
 *
 * # dev task config
 * Copies all directories and files, exept coffescript and less fiels, from the sails
 * assets folder into the .tmp/public directory.
 *
 * # build task config
 * Copies all directories nd files from the .tmp/public directory into a www directory.
 *
 * For usage docs see:
 * 		https://github.com/gruntjs/grunt-contrib-copy
 */
module.exports = function(grunt) {

	grunt.config.set('copy', {
		dev: {
			files: [
				{
					expand: true,
					cwd: './assets',
					src: ['**/*.!(coffee|less)'],
					dest: '.tmp/public'
				},
				{
					src: ['./bower_components/angular/angular.min.js'],
					dest: '.tmp/public/js/dependencies/angular.min.js'
				},
				{
					src: ['./bower_components/angular-route/angular-route.min.js'],
					dest: '.tmp/public/js/dependencies/angular.route.min.js'
				},
				{
					src: ['./bower_components/angular-resource/angular-resource.min.js'],
					dest: '.tmp/public/js/dependencies/angular.resource.min.js'
				},
				{
					src: ['./bower_components/bootstrap/dist/css/bootstrap.css'],
					dest: '.tmp/public/js/dependencies/bootstrap.css'
				},
				{
					src: ['./bower_components/angular-bootstrap/ui-bootstrap-tpls.js'],
					dest: '.tmp/public/js/dependencies/ui-bootstrap-tpls.js'
				},
				{
					expand: true,
					cwd: './bower_components/bootstrap/fonts',
					src: ['**/*'],
					dest: '.tmp/public/js/fonts'
				}
			]
		},
		build: {
			files: [{
				expand: true,
				cwd: '.tmp/public',
				src: ['**/*'],
				dest: 'www'
			}]
		}
	});

	grunt.loadNpmTasks('grunt-contrib-copy');
};
