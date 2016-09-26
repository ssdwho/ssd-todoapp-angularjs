var gulp = require('gulp'),
	connect = require('gulp-connect'),
	concat = require('gulp-concat'),
	minify = require('gulp-minify');

var config = {
	src: './src',
	dist: './dist',
	angular: './node_modules/angular/angular.min.js',
	todomvcApp: './node_modules/todomvc-app-css/index.css',
	todomvcCommon: './node_modules/todomvc-common'
};


gulp.task('nodeToDistJs', function() {
	return gulp.src([
		config.angular,
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

gulp.task('concatMin', function() {
	return gulp.src([
		config.src + '/js/module.js',
		config.src + '/js/config.js',
		config.src + '/js/controller.js',
		config.src + '/js/directive.js'
		])
		.pipe(concat('app.js'))
		.pipe(minify())
		.pipe(gulp.dest(config.dist + '/js'))
		.pipe(connect.reload());
});

gulp.task('srcToDistAll', function() {
	return gulp.src([
		config.src + '/*'
	])
	.pipe(gulp.dest(config.dist))
	.pipe(connect.reload());
});

gulp.task('connect', function() {
	connect.server({
		root: config.dist,
		port: 6100,
		livereload: true
	});
});


gulp.task('default', ['nodeToDistJs', 'nodeToDistCss', 'concatMin', 'srcToDistAll', 'connect'], function() {
	gulp.watch(config.src + '/**/*', ['srcToDistAll', 'concatMin']);
})