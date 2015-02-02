var gulp = require('gulp');
var sass = require('gulp-sass');
var connect = require('gulp-connect');
var opn = require('opn');

var tinylr;
var server = {
  host: 'localhost',
  port: '3000'
}

function notifyLiveReload(event) {
  var fileName = require('path').relative(__dirname, event.path);
  tinylr.changed({
    body: {
      files: [fileName]
    }
  });
}

gulp.task('livereload', function() {
  tinylr = require('tiny-lr')();
  tinylr.listen(35729);
});

gulp.task('sass', function() {
  return gulp.src('source/css/main.scss')
  .pipe(sass())
  .pipe(gulp.dest('source/css'));
});

gulp.task('watch', function() {
  gulp.watch('source/css/**/*.scss', ['sass']);
  gulp.watch('source/js/app/**/*.js', notifyLiveReload);
  gulp.watch('source/*.html', notifyLiveReload);
  gulp.watch('source/css/main.css', notifyLiveReload);
});

gulp.task('connect', function() {
  connect.server({
      root:        "source/",
      port:        server.port,
      livereload:  false
  });
});

gulp.task('openbrowser', function() {
  opn( 'http://' + server.host + ':' + server.port, "Google Chrome" );
});

// Default Task
gulp.task('default', ['livereload', 'sass', 'watch', 'connect', 'openbrowser']);
