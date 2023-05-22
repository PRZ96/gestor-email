const { src, dest, watch, series } = require("gulp");

// Compilar CSS
const sass = require("gulp-sass")(require("sass"));
const rename = require("gulp-rename");

function css(done) {
  src("src/scss/app.scss") // Identificar el archivo principal
    .pipe(
      rename({
        suffix: ".min",
      })
    )
    .pipe(sass()) // Compilar SASS
    .pipe(dest("src/")); // Exportarlo o guardarlo en una ubicación
  done();
}

function dev(done) {
  watch("src/scss/**/*.scss", css);
  watch("src/img/**/*");
  done();
}

exports.css = css;
exports.dev = dev;
exports.default = series(css, dev);
