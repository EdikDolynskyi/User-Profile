module.exports = function(grunt) {

	grunt.config.set('jade', {
		dev: {
			options: {
				pretty: true
			},
			files: [{
				expand: true,
				cwd: 'assets/js/',
				src: ['**/*.jade'],
				dest: '.tmp/public/js',
				ext: '.html'
			}]
		},
		prod: {
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