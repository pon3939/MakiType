const { dest, src, watch } = require('gulp');
const sass = require('gulp-sass');

const srcPath = 'src/';
const scssPath = `${srcPath}scss/**/*.scss`;
const cssPath = `${srcPath}css`;

// Sass(Scss)ファイルをコンパイル
const compileSass = (done) => {
  src(scssPath)
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(dest(cssPath));
  done();
};

// Sass(Scss)ファイルに変更があればコンパイル
const watchSass = (done) => {
  compileSass(done);
  watch(scssPath, compileSass);
  done();
};

exports.sass = compileSass;
exports.watch = watchSass;
exports.default = watchSass;
