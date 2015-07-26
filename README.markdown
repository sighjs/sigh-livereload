# sigh-livereload

[![build status](https://circleci.com/gh/sighjs/sigh-livereload.png)](https://circleci.com/gh/sighjs/sigh-livereload)

Livereload server.

## Example

`npm install --save sigh-livereload` then add something like this to your `sigh.js`:
```javascript
var livereload, glob, write, sass

module.exports = function(pipelines) {
  var globOpts = { basePath: 'src' }

  pipelines['build:source'] = [
    merge(
      [ glob(globOpts, '**/*.js'), babel() ],
      [ glob(globOpts, '**/*.scss') sass() ]
    ),
    write('build/assets'),
    livereload(),
  ]
}
```

Now whenever the `write` operation passes on written files, if they are `css` files the livereload server will update your page, if they are `.js` files the page will reload.

## TODO
 * Write tests.
 * Options for altering file paths, e.g. stripping/adding directories from/to path.
