var gulp = require('gulp');
var sass = require('gulp-sass');
var connect = require('gulp-connect');
var opn = require('opn');
var rjs = require('gulp-requirejs');
var processhtml = require('gulp-processhtml');
var rimraf = require('rimraf');

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
  .pipe(sass({
    errLogToConsole: true
  }))
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

gulp.task('cleaner',function( callback ) {
  rimraf('./build/*', callback);
});

gulp.task('sassdist', function() {
  return gulp.src('source/css/main.scss')
  .pipe(sass({
    omitSourceMapUrl: false,
    outputStyle: 'compressed',
    sourceComments: false
  }))
  .pipe(gulp.dest('build/css/'));
});

gulp.task('copyassets', function() {
  gulp.src('./source/inc/**/*')
    .pipe(gulp.dest('./build/inc'));
  gulp.src('./source/fonts/**/*')
    .pipe(gulp.dest('./build/fonts'));
  gulp.src('./source/images/**/*')
    .pipe(gulp.dest('./build/images'));
});

gulp.task('processhtml', function() {
  gulp.src('./source/*.html')
    .pipe(processhtml())
    .pipe(gulp.dest('./build'));
});

gulp.task('requirejs', function() {
  rjs({
      mainConfigFile: 'source/js/config.js',
      name: 'almond',
      baseUrl: 'source/js/app',
      out: 'build/js/main.min.js',
      include: ['app'],
      insertRequire: ['app'],
      wrap: true,
      optimize: 'uglify2',
      logLevel: 0,
      findNestedDependencies: true,
      fileExclusionRegExp: /^\./,
      inlineText: true
  })
    .pipe(gulp.dest('./')); // pipe it to the output DIR
});

// Default Task
gulp.task('default', ['livereload', 'sass', 'watch', 'connect', 'openbrowser']);
gulp.task('clean',[ 'cleaner' ]);
gulp.task('build',['sassdist','copyassets','processhtml','requirejs']);
