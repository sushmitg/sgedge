var gulp = require('gulp'),
postcss = require('gulp-postcss'),
autoprefixer = require('autoprefixer'),
nested = require('postcss-nested'),
cssImport = require('postcss-import'),
cssvars = require('postcss-simple-vars'),
mixins = require('postcss-mixins'),
plumber = require('gulp-plumber'),
notify = require('gulp-notify'),
gutil = require('gulp-util');

gulp.task('styles', function(){
  return gulp.src('./app/assets/css/styles.css')
    .pipe(plumber({ errorHandler: function(err) {
            notify.onError({
                title: "Gulp error in " + err.plugin,
                message:  err.toString()
            })(err);
            gutil.beep();
            this.emit('end');
        }}))
    .pipe(postcss([cssImport, mixins, cssvars, nested, autoprefixer]))
    .pipe(gulp.dest('./app/temp/css'))
});
