'use strict';

const gulp = require('gulp');
const webpack = require('webpack');
const gutil = require('gulp-util');
const notifier = require('node-notifier');
let webpackConfig = require('./webpack.config.js');
let statsLog = { // для красивых логов в консоли
  colors: true,
  reasons: true
};

gulp.task('scripts', (done) => {
  // run webpack
  webpack(webpackConfig, onComplete);

  function onComplete(error, stats) {
    if (error) { // кажется еще не сталкивался с этой ошибкой
      onError(error);
    } else if (stats.hasErrors()) { // ошибки в самой сборке, к примеру "не удалось найти модуль по заданному пути"
      onError(stats.toString(statsLog));
    } else {
      onSuccess(stats.toString(statsLog));
    }
  }

  function onError(error) {
    let formatedError = new gutil.PluginError('webpack', error);
    notifier.notify({ // чисто чтобы сразу узнать об ошибке
      title: `Error: ${formatedError.plugin}`,
      message: formatedError.message
    });
    done(formatedError);
  }

  function onSuccess(detailInfo) {
    gutil.log('[webpack]', detailInfo);
    done();
  }
});

gulp.task('watch', function(){
  gulp.watch(['src/*.js', 'src/*.css', 'src/*.scss'], gulp.parallel('scripts'));
});
