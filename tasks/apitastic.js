/*
 * grunt-apitastic
 * https://github.com/pichfl/grunt-apitastic
 *
 * Copyright (c) 2014 Florian Pichler
 * Licensed under the MIT license.
 */

//
'use strict';

var cheerio = require('cheerio');

module.exports = function(grunt) {
	grunt.registerMultiTask('apitastic', 'Generate JSON from HTML using CSS selectors.', function() {

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
			grunt.verbose.writeln('File "' + file.dest + '" created.');
		});
	});
};
