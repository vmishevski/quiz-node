/**
 * Created by Voislav on 7/16/2016.
 */
var gulp = require('gulp'),
  nodemon = require('gulp-nodemon'),
  ts = require('gulp-typescript'),
  tsProject = ts.createProject('tsconfig.json'),
  tslint = require('gulp-tslint');

gulp.task('tslint', function(){
  gulp.src(['app.ts', 'config/*.ts','app/**/*.ts'])
    .pipe(tslint({configuration: './tslint.json'}))
    .pipe(tslint.report({emitError: true}));
});

gulp.task('typescript', function() {
  console.log('Compiling typescript');
  return tsProject.src()
    .pipe(ts(tsProject)).js.pipe(gulp.dest('./.build'))
});

gulp.task('watch', ['tslint'], function() {
  gulp.watch(['./app.ts', './app/**/*.ts', './config/*.ts'], ['typescript']);
});

gulp.task('serve', ['tslint', 'typescript'], function () {
  nodemon({
    script: '.build/app.js',
    ext: 'js ts',
    tasks: ['tslint', 'typescript']
  });
});
