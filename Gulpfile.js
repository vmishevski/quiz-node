/**
 * Created by Voislav on 7/16/2016.
 */
var gulp = require('gulp'),
  nodemon = require('gulp-nodemon'),
  ts = require('gulp-typescript'),
  tsProject = ts.createProject('tsconfig.json'),
  tslint = require('gulp-tslint')
  mocha = require('gulp-mocha');

gulp.task('tslint', function(){
  gulp.src(['app.ts', 'config/*.ts','api/**/*.ts'])
    .pipe(tslint({configuration: './tslint.json'}))
    .pipe(tslint.report({emitError: false}));
});

gulp.task('copy', function () {
  return gulp.src(['**/*.yaml', '!node_modules/**/*'])
    .pipe(gulp.dest('.build/'));
});

gulp.task('typescript', function() {
  console.log('Compiling typescript');
  return tsProject.src()
    .pipe(ts(tsProject)).js.pipe(gulp.dest('.build/'))
});

gulp.task('test', ['typescript'], function(){
  return gulp.src('test/**/*.js')
    .pipe(mocha())
    .once('error', () => {
      process.exit(1);
    })
    .once('end', () => {
      process.exit();
    });
});

gulp.task('serve', ['copy', 'tslint', 'typescript'], function () {
  nodemon({
    script: '.build/app.js',
    ext: 'ts yaml',
    tasks: ['copy', 'tslint', 'typescript']
  });
});
