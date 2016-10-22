const gulp = require('gulp')
const elm = require('gulp-elm')
const gutil = require('gulp-util')
const plumber = require('gulp-plumber')
const connect = require('gulp-connect')

// File paths
const paths = {
  dest: 'dist',
  elm: 'app/*.elm',
  static: 'app/*.{html,css}'
}

// Init Elm
gulp.task('elm-init', elm.init)

// Compile Elm
gulp.task('elm', ['elm-init'], () =>{
    return gulp.src(paths.elm)
        .pipe(plumber())
        .pipe(elm())
        .pipe(gulp.dest(paths.dest))
})

// Move static assets to dist
gulp.task('static', () => {
    return gulp.src(paths.static)
        .pipe(plumber())
        .pipe(gulp.dest(paths.dest))
})

// Watch for changes and compile
gulp.task('watch', () => {
    gulp.watch(paths.elm, ['elm'])
    gulp.watch(paths.static, ['static'])
})

// Local server
gulp.task('connect', () => {
    connect.server({
        root: 'dist',
        port: 3000
    })
})

// Main gulp tasks
gulp.task('build', ['elm', 'static'])
gulp.task('default', ['connect', 'build', 'watch'])
