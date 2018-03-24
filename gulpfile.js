'use strict';

//Importando os módulos de desenvolvimento
var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');

//Contruir folha de estilo principal
gulp.task('sass', function () {
    return gulp.src('htdocs/assets/style/scss/style.scss')
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(gulp.dest('htdocs/assets/style/'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

//Iniciar o servidor de desenvolvimento e o monitoramento de arquivos
gulp.task('serve', ['browserSync', 'sass'], function () {
    gulp.watch('htdocs/assets/style/scss/*.scss', ['sass']);
    // Recarregar a página quando algum arquivo HTML ou JS for modificado
    gulp.watch('htdocs/*.html', browserSync.reload);
    gulp.watch('htdocs/script/*.js', browserSync.reload);
});

gulp.task('browserSync', function () {
    browserSync.init({
        server: {
            baseDir: 'htdocs'
        },
    })
});
