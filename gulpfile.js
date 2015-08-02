var gulp = require('gulp');
var static_site = require('gulp-static-site');

var paths = {
    sources: ['resources/content/**','templates/**'],
    stylesheets: ['css/**'],
    bowerDir: './bower_components' 
};

gulp.task('icons', function() { 
    return gulp.src(paths.bowerDir + '/fontawesome/fonts/**.*') 
        .pipe(gulp.dest('./web/dist/fonts')); 
});

gulp.task('bower', function() { 
    return bower()
         .pipe(gulp.dest(paths.bowerDir)) 
});

gulp.task('site', function () {
    return gulp.src('resources/content/**/*.md')
        .pipe(static_site())
        .pipe(gulp.dest('web/'))
});

gulp.task('css', function () {
    return gulp.src('css/*.css')
        .pipe(gulp.dest('build/css'));
});

gulp.task('default', ['site','css']);

// Rerun the task when a file changes
 gulp.task('watch', function() {
    gulp.watch(paths.sources, ['site']);
    gulp.watch(paths.stylesheets, ['css']);
});
