var gulp = require('gulp');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var cssnano = require('cssnano');
var rename = require('gulp-rename');
var stylelint = require('stylelint');
var reporter = require('postcss-reporter');
var cssvariables = require('postcss-css-variables');
var cssmixins = require('postcss-mixins');
var calc = require('postcss-calc');


gulp.task('styles', function(){
    return gulp.src('wp-content/themes/alicja/src/*.css')
        .pipe(postcss([autoprefixer, cssnano, cssvariables(), cssmixins(), calc()]))
        .pipe(sourcemaps.init())
        .pipe(sourcemaps.write('maps/'))
        .pipe(gulp.dest('wp-content/themes/alicja/assets/css/'));
});

gulp.task('rename', ['styles'], function(){
    return gulp.src('wp-content/themes/alicja/assets/css/index.css')
        .pipe(postcss([cssnano]))
        .pipe(rename('index.min.css'))
        .pipe(sourcemaps.init())
        .pipe(sourcemaps.write('maps/'))
        .pipe(gulp.dest('wp-content/themes/alicja/assets/css/'));
})

gulp.task('lint-styles', function(){
    return gulp.src('wp-content/themes/alicja/assets/css/index.css')
        .pipe(postcss([stylelint({
            "rules": {
                "color-no-invalid-hex": true,
                "declaration-colon-space-before": "never",
                "indentation": 4,
                "number-leading-zero": "always"
            }
        }),
        reporter({
            clearMessage: true,
        })
    ]))
});

gulp.task('default', ['styles','rename','lint-styles']);

var watcher = gulp.watch('wp-content/themes/alicja/src/index.css', ['default']);
watcher.on('change', function(event){
    console.log('file '+ event.path + ' was '+ event.type +' , running tasks ...');
});