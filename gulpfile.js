const { src, dest, series, parallel } = require("gulp");
const GulpCleanCss = require("gulp-clean-css");
const GulpPug = require("gulp-pug");
const fs = require('fs')

function clean(cb) {
    if(fs.existsSync('dist')) {
        require('rimraf')('dist', cb)
    }else cb()
}

function transpilePug() {
    return src('src/pages/**/*.pug')
        .pipe(GulpPug())
        .pipe(dest('tmp/pages'))
}

function transpileScss() {
    return src('src/scss/**/*.scss')
        .pipe(require('gulp-sass')())
        .pipe(dest('tmp/css'))
}

function minifyCss() {
    return src('tmp/css/**/*.css')
        .pipe(GulpCleanCss())
        .pipe(dest('dist/css'))
}

function minifyHtml() {
    return src('tmp/pages/**/*.html')
        .pipe(require('gulp-htmlmin')())
        .pipe(dest('dist/pages'))
}

function cleanTmp(cb) {
    if(fs.existsSync('tmp')) {
        require('rimraf')('tmp', cb)
    }else cb()
}

exports.default = series(
    clean,
    parallel(
        series(
            transpilePug,
            minifyHtml
        ),
        series(
            transpileScss,
            minifyCss
        )
    ),
    cleanTmp
)