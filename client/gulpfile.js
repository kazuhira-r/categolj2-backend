var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var sourcemaps = require('gulp-sourcemaps');
var cssMinify = require('gulp-minify-css');
var del = require('del');

var paths = {
    scripts: ['app/js/**/*.js'],
    html: 'app/*.html',
    images: 'app/img/**/*',
    css: {
        files: ['app/css/*.css'],
        root: 'app/css'
    },
    target: 'target/classes/META-INF/resources'
};

gulp.task('clean', function (cb) {
    del([paths.target], cb);
});

gulp.task('scripts', ['clean'], function () {
    return gulp.src(paths.scripts)
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(concat('all.min.js'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(paths.target + '/js'));
});

gulp.task('images', ['clean'], function () {
    return gulp.src(paths.images)
        .pipe(imagemin({optimizationLevel: 5}))
        .pipe(gulp.dest(paths.target + '/img'));
});

gulp.task('css', ['clean'], function () {
    return gulp.src(paths.css.files)
        .pipe(cssMinify({root: paths.css.root, noRebase: true}))
        .pipe(gulp.dest(paths.target + '/css'));
});

gulp.task('html', ['clean'], function () {
    return gulp.src(paths.html)
        .pipe(gulp.dest(paths.target));
});

gulp.task('watch', function () {
    gulp.watch(paths.scripts, ['scripts']);
    gulp.watch(paths.images, ['images']);
});

gulp.task('build', ['scripts', 'images', 'css', 'html']);