module.exports = function(grunt) {

	grunt.config.set('jade', {
		dev: {
			files: [{
				expand: true,
				cwd: 'assets/js/',
				src: ['**/*.jade'],
				dest: '.tmp/public/js',
				ext: '.html'
			}]
		}
	});

	grunt.loadNpmTasks('grunt-contrib-jade');
};