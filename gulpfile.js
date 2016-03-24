var
    gulp_config = require('./gulp.config.js'),
    gulp = require('gulp'),
    plugins = require("gulp-load-plugins")({lazy: false}),
    config = gulp_config;

gulp.task('scripts_local', function () {
    return gulp.src(gulp_config.COMMON_MODULES)
        .pipe(plugins.sourcemaps.init())
        .pipe(plugins.concat('app.min.js'))
        .pipe(gulp.dest('./dist/js'));
});


gulp.task('templates_local', function () {
    return gulp.src(['!./www/index.html',
            './www/**/**/*.html'])
        .pipe(plugins.angularTemplatecache('templates.js', {standalone: true}))
        .pipe(gulp.dest('./dist/js'));
});


gulp.task('css_local', function () {
    return gulp.src(['./www/**/*.css'])
        .pipe(plugins.concat('app.min.css'))
        .pipe(plugins.minifyCss({keepBreaks: false}))
        .pipe(gulp.dest('./dist/css'));
});


gulp.task('bower_scripts_min_local',function () {
    return gulp.src(config.BOWER_SCRIPTS)
        .pipe(plugins.sourcemaps.init())
        .pipe(plugins.concat('bower-components.min.js'))
        .pipe(plugins.ngAnnotate())
        .pipe(plugins.uglify({mangle: false}))
        .pipe(plugins.sourcemaps.write())
        .pipe(gulp.dest('./dist/js'))
});


gulp.task('bower_css_min_local',function () {
    return gulp.src(config.BOWER_CSS)
        .pipe(plugins.concat('bower-components.min.css'))
        .pipe(plugins.minifyCss({keepBreaks: false}))
        .pipe(gulp.dest('./dist/css'));
});

//gulp.task('vendorBOWER', function () {
//    gulp.src(config.BOWER_FONTS)
//        .pipe(gulp.dest('./dist/fonts'));
//    gulp.src('./bower_components/angular-sanitize/angular-sanitize.min.js.map')
//        .pipe(gulp.dest('./dist/js'));
//});

gulp.task('watch_local', function () {
    gulp.watch([
        'dist/**/*.html',
        'dist/**/*.js',
        'dist/**/*.css'
    ], function (event) {
        return gulp.src(event.path)
            .pipe(plugins.connect.reload());
    });
    gulp.watch(['./www/**/*.js'],  ['scripts_local', 'templates_local']);
    gulp.watch(['./www/**/*.html'], ['templates_local']);
    gulp.watch('./www/**/*.css', ['css_local']);
});


gulp.task('copy_index', function () {
    return gulp.src('./www/index.html')
        .pipe(gulp.dest('./dist'));
});



gulp.task('connect', plugins.connect.server({
    root: ['dist'],
    port: 9000,
    livereload: true
}));


gulp.task('clean_dist', function () {
    return gulp.src('./dist', {read: false})
        .pipe(plugins.clean());
});

gulp.task('build_local',['clean_dist', 'copy_index', 'scripts_local', 'templates_local', 'css_local', 'bower_scripts_min_local', 'bower_css_min_local']);




gulp.task('default', ['connect', 'build_local',  'watch_local']);