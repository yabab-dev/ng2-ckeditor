var gulp = require('gulp');
var babel = require('gulp-babel');
var sourcemaps = require('gulp-sourcemaps');

var distDir = 'lib/';
var srcFiles = 'src/**/*.es6';

/**
 * Default task
 */
gulp.task('default', ['babel']);

/**
 * Babel transpile source
 */
gulp.task('babel', function(){
    return gulp.src(srcFiles)
        .pipe(sourcemaps.init())
        .pipe(babel())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(distDir));
});

gulp.task('babel:watch', function(){
    return gulp.watch(srcFiles, ['babel']);
});
