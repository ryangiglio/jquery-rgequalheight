// Include gulp
var gulp = require('gulp'); 

// File Plugins
var rename = require('gulp-rename');

// JS plugins
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');

/*
 * Development tasks
 */
gulp.task('default', ['jshint', 'minify']);

// Run jshint on all .js files in the /src folder
gulp.task('jshint', function() {

  return gulp.src('src/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

// Minify and rename all the js files in the /src folder
gulp.task('minify', function() {

  return gulp.src('src/*.js')
    .pipe(uglify())
    .pipe(rename({
      suffix: ".min",
      extname: ".js"
    }))
    .pipe(gulp.dest('dist'));
});
