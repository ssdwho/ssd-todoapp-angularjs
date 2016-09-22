var gulp = require('gulp');
var connect = require('gulp-connect');

var config = {
	src: './src',
	dist: './dist',
	angular: './node_modules/angular/angular.min.js',
	angularRoute: './node_modules/angular-route/angular-route.min.js',
	todomvcApp: './node_modules/todomvc-app-css/index.css',
	todomvcCommon: './node_modules/todomvc-common'
};


gulp.task('nodeToDistJs', function() {
        return gulp.src([
                        config.angular,
                        config.angularRoute
                ])
                .pipe(gulp.dest(config.dist + '/vendor/js'));
});

gulp.task('nodeToDistCss', function() {
        return gulp.src([
                        config.todomvcApp,
                        config.todomvcCommon + '/base.css'
                ])
                .pipe(gulp.dest(config.dist + '/vendor/css'));
});

gulp.task('srcToDistAll', function() {
        return gulp.src([
                        config.src + '/**/**/**/*'
                ])
                .pipe(gulp.dest(config.dist))
                .pipe(connect.reload());
});

gulp.task('connect', function() {
  connect.server({
        root: config.dist,
        port: 4200,
        livereload: true
  });
});


gulp.task('default', ['nodeToDistJs', 'nodeToDistCss', 'srcToDistAll', 'connect'], function() {
        gulp.watch(config.src + '/**/**/**/*', ['srcToDistAll']);
})