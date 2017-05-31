const gulp = require('gulp');
const concat = require('gulp-concat');
const babel = require('gulp-babel');
const sass = require('gulp-sass');

// Instructions for how task will run.
gulp.task('concat', function(){
  gulp.src(['./public/js/app.js', './public/js/*.js'])
  .pipe(babel({
    presets: ['es2015']
  }))
  .pipe(concat('bundle.js'))
  .pipe(gulp.dest('./public/dist'));
});


// Compile scss into css files
gulp.task('sass', function() {
  gulp.src([
    './public/styles/*.css',
    './public/styles/*.scss'
  ])
  .pipe(sass().on('error', sass.logError))
  .pipe(concat('all.css'))
  .pipe(gulp.dest('./public/dist'));
});

gulp.task('watch', function() {
    // Gulp watch
    // takes two arguments: the file(s) to watch, and then the task to do if it notices a change.
    gulp.watch('./public/js/*.js', ['concat']);
    gulp.watch(['./public/styles/*.css', './public/styles/*.scss'], ['sass']);
})

gulp.task('default', ['concat', 'sass', 'watch']);


