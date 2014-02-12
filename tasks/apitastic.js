/*
 * grunt-apitastic
 * https://github.com/pichfl/grunt-apitastic
 *
 * Copyright (c) 2014 Florian Pichler
 * Licensed under the MIT license.
 */

'use strict';

var path = require('path');
var fs = require('fs');
var cheerio = require('cheerio');

module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('apitastic', 'Generate JSON from HTML using CSS selectors.', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      punctuation: '.',
      separator: ', '
    });

    // Iterate over all specified file groups.
    this.files.forEach(function(f) {
      // // Concat specified files.
      // var src = f.src.filter(function(filepath) {
      //   // Warn on and remove invalid source files (if nonull was set).
      //   if (!grunt.file.exists(filepath)) {
      //     grunt.log.warn('Source file "' + filepath + '" not found.');
      //     return false;
      //   } else {
      //     return true;
      //   }
      // }).map(function(filepath) {
      //   // Read file source.
      //   return grunt.file.read(filepath);
      // }).join(grunt.util.normalizelf(options.separator));

      // // Handle options.
      // src += options.punctuation;

      // // Write the destination file.
      // grunt.file.write(f.dest, src);

      var options = this.options({
        queries: {}
      });
      var queries = options.queries;

      grunt.verbose.writeln('Generating ApiTastic Static API');
      grunt.verbose.writeln('Queries: ', JSON.stringify(queries, null, 4));

      this.files.forEach(function(file) {
        var content = grunt.file.read(file.src[0]);
        var $ = cheerio.load(content);
        var data = {};

        Object.keys(queries).forEach(function(key) {
          data[key] = $(queries[key]).html();
        });
        grunt.file.write(file.dest, JSON.stringify(data, null, 0));
      });

      // Print a success message.
      grunt.log.writeln('File "' + f.dest + '" created.');
    });
  });

};
