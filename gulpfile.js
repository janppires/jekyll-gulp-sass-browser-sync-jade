var gulp        = require('gulp');
var browserSync = require('browser-sync');
var sass        = require('gulp-sass');
var prefix      = require('gulp-autoprefixer');
var cp          = require('child_process');
var jade          = require('gulp-jade');

var jekyll   = 'jekyll';
var messages = {
    jekyllBuild: '<span style="color: grey">Running:</span> $ ' + jekyll + ' build'
};

/**
 * Build the Jekyll Site
 */
gulp.task('jekyll-build', function (done) {
    browserSync.notify(messages.jekyllBuild);
    return cp.spawn( jekyll , ['build'], {stdio: 'inherit'})
        .on('close', done);
});

/**
 * Rebuild Jekyll & do page reload
 */
gulp.task('jekyll-rebuild', ['jekyll-build'], function () {
    browserSync.reload();
});

/**
 * Wait for jekyll-build, then launch the Server
 */
// gulp.task('browser-sync', ['sass', 'jekyll-build'], function() {
gulp.task('browser-sync', ['jekyll-build'], function() {
    browserSync({
        server: {
            baseDir: '_site'
        }
    });
});

/**
 * Compile files from assets/css into both _site/assets/css (for live injecting) and site (for future jekyll builds)
 */
gulp.task('sass', function () {
    return gulp.src('_assets/sass/main.scss')
        .pipe(sass({
            includePaths: [
              'node_modules/bourbon/app/assets/stylesheets',
              'node_modules/normalize-scss/sass'
          ],
            onError: browserSync.notify
        }))
        .pipe(prefix(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
        .pipe(gulp.dest('_assets/css'))
        // .pipe(browserSync.reload({stream:true}));
});

/*
  Compile Jade files
*/
gulp.task('jade', function(){
  return gulp.src('_jadefiles/*.jade')
  .pipe(jade())
  .pipe(gulp.dest('_includes'));
})


/**
 * Watch scss files for changes & recompile
 * Watch html/md files, run jekyll & reload BrowserSync
 */
gulp.task('watch', function () {
    gulp.watch('_assets/sass/**', ['sass']);
    gulp.watch(['index.html', '_layouts/*', '_includes/*.html', '_assets/css/*', '_assets/javascripts/*'], ['jekyll-rebuild']);
    gulp.watch('_jadefiles/*.jade', ['jade']);
});

/**
 * Default task, running just `gulp` will compile the sass,
 * compile the jekyll site, launch BrowserSync & watch files.
 */
gulp.task('default', ['sass', 'jade', 'browser-sync', 'watch']);
