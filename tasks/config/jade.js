module.exports = function(grunt) {

	grunt.config.set('jade', {
		dev: {
			files: [{
				expand: true,
				cwd: 'views',
				src: ['test.jade'],
				dest: 'views',
				ext: '.html'
			}]
		}
	});

	grunt.loadNpmTasks('grunt-contrib-jade');
};