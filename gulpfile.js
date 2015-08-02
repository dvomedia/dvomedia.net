var gulp = require('gulp')
    static_site = require('gulp-static-site')
    sass   = require('gulp-ruby-sass') 
    notify = require("gulp-notify") 
    bower  = require('gulp-bower');

var paths = {
    sources: ['resources/content/**','templates/**'],
    stylesheets: ['css/**'],
    bowerDir: 'bower_components' ,
    sassPath: 'resources/sass',
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

gulp.task('css', function() { 
    return gulp.src(paths.sassPath + '/style.scss')
         .pipe(sass({
             style: 'compressed',
             loadPath: [
                 './resources/sass',
                 paths.bowerDir + '/bootstrap-sass-official/assets/stylesheets',
                 paths.bowerDir + '/fontawesome/scss',
             ]
         }) 
            .on("error", notify.onError(function (error) {
                 return "Error: " + error.message;
             }))) 
         .pipe(gulp.dest('./web/dist/css')); 
});


gulp.task('default', ['bower', 'icons', 'site','css']);

// Rerun the task when a file changes
 gulp.task('watch', function() {
    gulp.watch(paths.sources, ['site']);
    gulp.watch(paths.stylesheets, ['css']);
});
