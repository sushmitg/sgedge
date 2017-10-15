var gulp = require('gulp'),
plumber = require('gulp-plumber'),
notify = require('gulp-notify'),
gutil = require('gulp-util'),
postcss = require('gulp-postcss'),
cssImport = require('postcss-import'),
mixins = require('postcss-mixins'),
cssvars = require('postcss-simple-vars'),
nested = require('postcss-nested'),
autoprefixer = require('autoprefixer');

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
