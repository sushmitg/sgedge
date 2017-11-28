var gulp = require('gulp'),
imagemin = require('gulp-imagemin'),
del = require('del'),
usemin = require('gulp-usemin'),
rev = require('gulp-rev'),
cssnano = require('gulp-cssnano'),
uglify = require('gulp-uglify'),
browserSync = require('browser-sync').create(),
gcmq = require('gulp-group-css-media-queries');

gulp.task('previewDocs', function (){
  browserSync.init({
    server: {
      baseDir:"docs"
    }
  });
});

gulp.task('deleteDistFolder', function (){
  return del('./docs');
});

gulp.task('copyGeneralFiles', ['deleteDistFolder'], function (){
  var pathsToCopy = [
    './app/**/*',
    '!./app/index.html',
    '!./app/assets/images/**',
    '!./app/assets/css/**',
    '!./app/assets/js/**',
    '!./app/temp',
    '!./app/temp/**'
  ]
  return gulp.src(pathsToCopy)
  .pipe(gulp.dest("./docs"));
});

gulp.task('optimizeImages', ['deleteDistFolder'], function () {
  return gulp.src('./app/assets/images/**/*')
    .pipe(imagemin({
      progressive: true,
      interlaced: true,
      multipass: true
    }))
    .pipe(gulp.dest('./docs/assets/images'));
});

gulp.task('usemin', ['deleteDistFolder', 'styles', 'scripts'], function(){
  return gulp.src('./app/*.html')
    .pipe(usemin({
      css: [function(){return rev()}, function(){return gcmq()}, function(){return cssnano()}],
      js: [function(){return rev()}, function(){return uglify()}]
    }))
    .pipe(gulp.dest('./docs'));
});

gulp.task('build', ['deleteDistFolder', 'copyGeneralFiles', 'optimizeImages', 'usemin']);
