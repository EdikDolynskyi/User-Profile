module.exports = function(grunt) {

	grunt.config.set('browserify', {
		// browserify: {
			my: {
				dest: '.tmp/public/js/main.js',
				src: ['assets/js/**/*.js','!assets/js/dependencies/*.js']
			}
		// }
	});

	grunt.loadNpmTasks('grunt-browserify');
};
