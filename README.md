# grunt-apitastic

> Generate JSON from HTML using CSS selectors.

This might be helpful if you use a static site generator like [assemble](http://assemble.io) or anything else that generates static HTML and want to load only a very specific portion with Ajax.


## Getting Started
This plugin requires Grunt `~0.4.2`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-apitastic --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-apitastic');
```

## The "apitastic" task

### Overview
In your project's Gruntfile, add a section named `apitastic` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  apitastic: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
});
```

### Options

#### options.queries
Type: `Object`
Default: `{}`

An object with names and the corresponding selectors.

This task uses [cheerio](https://github.com/MatthewMueller/cheerio) to query your HTML, check their page for supported selectors.

### Usage Examples

```js
grunt.initConfig({
  apitastic: {
    options: {
      queries: {
        'title': 'head>title',
        'menu': '#top nav',
        'content': '#page'
      }
    },
    files: {
      expand: true,
      cwd: 'html',
      src: ['**/*.html'],
      dest: 'api', // your shiny static json api endpoint
      ext: '.json' // created files should probably end in .json
    },
  },
});
```

Results in JSON files in the same directory structure as your HTML files, each containing an Object with the keys defined from the keys in the queries option and the parsed content found by the corresponding css query.

## Release History

* 0.1.1-1: Fixed fix. Yeah, sorry.
* 0.1.1: Fixed initial failure
* 0.1.0: Initial release.
