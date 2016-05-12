var gulp = require('gulp');
var babel = require('gulp-babel');
var sourcemaps = require('gulp-sourcemaps');
var cache = require('gulp-cached');

var paths = {
    dest: 'lib/',
    sources: 'src/**/*.es6'
};

/**
 * Default task
 */
gulp.task('default', ['watch']);

/**
 * Build all
 */
gulp.task('build', ['babel']);

/**
 * Babel transpile all sources
 */
gulp.task('babel', function(){
    return gulp.src(paths.sources)
        .pipe(cache('babel-dev'))
        .pipe(sourcemaps.init())
        .pipe(babel())
        .on('error', function(err){
            console.error(err.stack);
            this.emit('end');
        })
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(paths.dest));
});

/**
 * Babel watch
 */
gulp.task('watch', function(){
    return gulp.watch([paths.sources], ['babel']);
});
