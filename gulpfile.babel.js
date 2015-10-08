import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import browserSync from 'browser-sync';
import del from 'del';
import browserify from 'browserify';
import babelify from 'babelify';
import buffer from 'vinyl-buffer';
import source from 'vinyl-source-stream';

import {
  stream as wiredep
} from 'wiredep';

const $ = gulpLoadPlugins();
const reload = browserSync.reload;
const es6 = true;

gulp.task('styles', () => {
  return gulp.src('app/styles/**/*.scss')
    .pipe($.plumber())
    .pipe($.sourcemaps.init())
    .pipe($.sass.sync({
      outputStyle: 'expanded',
      precision: 10,
      includePaths: ['.']
    }).on('error', $.sass.logError))
    .pipe($.autoprefixer({
      browsers: ['last 2 version', 'ie >= 9']
    }))
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest('.tmp/styles'))
    .pipe($.size())
    .pipe(reload({
      stream: true
    }));
});

// todo
gulp.task('compass', () => {
  return gulp.src('./src/**/*.scss')
    .pipe($.plumber({
      errorHandler: function(error){
        console.log(error.message);
        this.emit('end');
      }
    }))
    .pipe($.compass({
      config_file: './config.rb',
      css: '.tmp/styles',
      sass: 'app/styles',
      image: 'app/images'
    }))
    .pipe(gulp.dest('.tmp/styles'));
});

function getLocals() {
  var config = require('./config');
  delete require.cache[require.resolve('./config')];
  return config;
}

gulp.task('jade', () => {
  return gulp.src('app/index.jade')
    .pipe($.plumber())
    .pipe($.jade({
      locals: getLocals(),
      pretty: true
    }))
    .pipe(gulp.dest('.tmp'))
    .pipe($.size())
    .pipe(reload({
      stream: true
    }));
});

function lint(files, options) {
  return () => {
    return gulp.src(files)
      .pipe($.plumber())
      .pipe($.eslint(options))
      .pipe($.eslint.format())
      .pipe($.if(!browserSync.active, $.eslint.failAfterError()))
      .pipe(reload({
        stream: true,
        once: true
      }));
  };
}
const testLintOptions = {
  env: {
    mocha: true
  }
};

gulp.task('lint', /*['jscs'], */ lint('app/scripts/**/*.js'));
gulp.task('lint:test', /*['jscs'], */ lint('test/spec/**/*.js', testLintOptions));

gulp.task('es6', () => {
  return browserify('app/scripts/main.js', {
    debug: true
  })
    .add(require.resolve('babel-core/polyfill'))
    .transform(babelify.configure({
      stage: 0,
      sourceMaps: 'inline',
      highlightCode: true,
      comments: false,
      compact: false,
      optional: ['runtime']
    }))
    .bundle()
    .on('error', function (err) {
      console.log(err.message);
      this.emit('end');
    })
    .pipe(source('scripts/main.js'))
    //.pipe(buffer())
    // plugin not support stream
    .pipe(gulp.dest('.tmp'))
    .pipe($.size())
    .pipe(reload({
      stream: true
    }));
});

gulp.task('jscs', () => {
  return gulp.src('app/scripts/**/*.js')
    .pipe($.jscs())
    .pipe($.jscsStylish /*.combineWithHintResults*/());
});

gulp.task('html', es6 ? ['styles', 'es6', 'jade'] : ['styles', 'jade'], () => {
  const assets = $.useref.assets({
    searchPath: ['.tmp', 'app/styles/', '.']
  });

  return gulp.src('.tmp/*.html')
    .pipe(assets)
    .pipe($.if('*.js', $.uglify()))
    .pipe($.if('*.css', $.minifyCss({
      compatibility: '*'
    })))
    .pipe(assets.restore())
    .pipe($.useref())
    .pipe($.if('*.html', $.minifyHtml({
      conditionals: true,
      loose: true
    })))
    .pipe(gulp.dest('dist'));
});

gulp.task('images', () => {
  return gulp.src('app/images/**/*')
    .pipe($.if($.if.isFile, $.cache($.imagemin({
      progressive: true,
      interlaced: true,
      // don't remove IDs from SVGs, they are often used
      // as hooks for embedding and styling
      svgoPlugins: [{
        cleanupIDs: false
      }]
    }))
      .on('error', function (err) {
        // console.log(err);
        this.end();
      })))
    .pipe(gulp.dest('dist/images'))
    .pipe($.size());
});

gulp.task('fonts', () => {
  return gulp.src(require('main-bower-files')({
    filter: '**/*.{eot,svg,ttf,woff,woff2}'
  }).concat('app/fonts/**/*'))
    .pipe(gulp.dest('.tmp/fonts'))
    .pipe(gulp.dest('dist/fonts'))
    .pipe($.size());
});

gulp.task('extras', () => {
  return gulp.src([
    'app/*.*',
    '!app/*.html'
  ], {
    dot: true
  }).pipe(gulp.dest('dist'));
});

gulp.task('clean', del.bind(null, ['.tmp', 'dist']));

gulp.task('serve', es6 ? ['lint', 'styles', 'es6', 'fonts', 'jade'] : ['lint', 'styles', 'fonts', 'jade'], () => {
  browserSync({
    notify: true,
    port: 9000,
    server: {
      baseDir: ['.tmp', 'app'],
      routes: {
        '/bower_components': 'bower_components'
      }
    },
    logLevel: 'info',
    logFileChanges: true,
    logSnippet: true
    /*tunnel: "my-private-site"*/
  });

  gulp.watch([
    'app/images/**/*',
    '.tmp/fonts/**/*'
  ]).on('change', reload);

  gulp.watch(['app/**/*.jade', 'config.json'], ['jade']);
  gulp.watch('app/scripts/**/*.js', ['lint', 'es6']);
  gulp.watch('app/styles/**/*.scss', ['styles']);
  gulp.watch('app/fonts/**/*', ['fonts']);
  gulp.watch('bower.json', ['wiredep', 'fonts']);
});

gulp.task('serve:dist', () => {
  browserSync({
    notify: false,
    port: 9000,
    server: {
      baseDir: ['dist']
    }
  });
});

gulp.task('serve:test', () => {
  browserSync({
    notify: false,
    port: 9000,
    ui: false,
    server: {
      baseDir: 'test',
      routes: {
        '/bower_components': 'bower_components'
      }
    }
  });

  gulp.watch('test/spec/**/*.js').on('change', reload);
  gulp.watch('test/spec/**/*.js', ['lint:test']);
});

// inject bower components
gulp.task('wiredep', () => {
  gulp.src('app/styles/*.scss')
    .pipe(wiredep({
      ignorePath: /^(\.\.\/)+/
    }))
    .pipe(gulp.dest('app/styles'));

  gulp.src('app/*.html')
    .pipe(wiredep({
      ignorePath: /^(\.\.\/)*\.\./
    }))
    .pipe(gulp.dest('app'));
});

gulp.task('build', ['lint', 'html', 'images', 'fonts', 'extras'], () => {
  return gulp.src('dist/**/*').pipe($.size({
    title: 'build',
    gzip: true
  }));
});

gulp.task('default', ['clean'], () => {
  gulp.start('build');
});
