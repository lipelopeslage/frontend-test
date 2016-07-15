var gulp = require('gulp'),
	stylus = require('gulp-stylus'),
	watch = require('gulp-watch'),
	myPaths = {stylus: './assets/stylus/**/*.styl',js: './assets/js/**/*.js'},
  browserify = require('gulp-browserify'),
  concat = require('gulp-concat');

function theError(error){
  var type = (error.plugin == 'gulp-browserify') ? 'SCRIPTS' : 'STYLUS';
  console.log(error);
  console.log('\n::::::: ERRO COMPILANDO '+type+'. AGUARDANDO CORREÇÃO. ::::::::')
  this.emit('end');
}

gulp.task('browserify', function() {
    gulp.src('./assets/js/catho.js')
      .pipe(browserify())
      .on('error', theError)
      .pipe(gulp.dest('./public/js'))
});
 
gulp.task('stylus', function() {
  gulp.src(myPaths.stylus)
    .pipe(stylus())
    .on('error', theError)
    .pipe(concat('catho.css'))
    .pipe(gulp.dest('./public/css'))
});

gulp.task('watch', function() {
  gulp.watch(myPaths.stylus, ['stylus']);
  gulp.watch(myPaths.js, ['browserify']);
});

gulp.task('default', ['stylus', 'browserify', 'watch']);