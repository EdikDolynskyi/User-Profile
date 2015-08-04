/**
 * grunt/pipeline.js
 *
 * The order in which your css, javascript, and template files should be
 * compiled and linked from your views and static HTML files.
 *
 * (Note that you can take advantage of Grunt-style wildcard/glob/splat expressions
 * for matching multiple files.)
 */

// CSS files to inject in order
//
// (if you're using LESS with the built-in default config, you'll want
//  to change `assets/styles/importer.less` instead.)
var cssLibsToInject = [
];

var cssFilesToInject = [
  'styles/**/*.css'
];

var jsLibsToInject = [
    'js/dependencies/*.js'
];

var jsFilesToInject = [
    'js/user-profile/**/*.js'
];


module.exports.jsFiles = jsLibsToInject.concat(jsFilesToInject).map(function(path) {
    return '.tmp/public/' + path;
});

module.exports.cssFiles = cssLibsToInject.concat(cssFilesToInject).map(function(path) {
    return '.tmp/public/' + path;
});
