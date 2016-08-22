jekyll-gulp-sass-browser-sync-jade
=============================

A starter project including full setup for Jekyll, GulpJS, SASS, AutoPrefixer, BrowserSync  &amp; Jade

This is a simplified version of the [jekyll-gulp-sass-browser-sync](https://github.com/shakyShane/jekyll-gulp-sass-browser-sync) project by [shakyShane](https://github.com/shakyShane).

Here you can use Jade files and assets are under `_assets` folder respecting `jekyll-assets` gem.
It is already included `bourbon` and `normalize-scss` as dependencies.


## System Preparation

To use this starter project, you'll need the following things installed on your machine.

1. [Jekyll](http://jekyllrb.com/) - `$ gem install jekyll`
2. [jekyll-assets](http://jekyllrb.com/) - `$ gem install jekyll-assets`
3. [NodeJS](http://nodejs.org) - use the installer.
4. [GulpJS](https://github.com/gulpjs/gulp) - `$ npm install -g gulp` (mac users may need sudo)

## Usage

**development mode**

This will give you file watching, browser synchronisation, auto-rebuild, CSS injecting etc etc.

```
npm run gulp
```
