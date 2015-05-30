module.exports = function(grunt) {
	/**
	 * This task finds all Angular modules within a directory,
	 * and then generates a "parent module" that lists all modules as dependencies.
	 *
	 * This allows us to create or remove files, without having to maintain this list manually.
	 *
	 * CAVEATS:
	 * This task assumes that each module's name is the same as the file's name,
	 * so you must stick to this convention.
	 *      For example:
	 *      hello-world.js
	 *      angular.module('hello-world.js', [])...
	 *
	 */
	grunt.registerTask('build-angular', [ 'fileindex:GENERATE-MODULE-LISTS' ]);

	grunt.config.merge({
		fileindex: {
			'GENERATE-MODULE-LISTS': {
				files: {
					'src/app/app-components.js': [
						'src/app/components/**/*.js'
					],
					'src/app/app-pages.js': [
						'src/app/pages/**/*.js'
					]
				},
				options: {
					format: function generateAngularModuleFromFiles(list, options, dest) {
						function getFileName(file) {
							return (file.lastIndexOf('/') === -1) ? file : file.substr(file.lastIndexOf('/') + 1);
						}
						return (
							"/* This file was generated by [build-angular.js] */\n" +
							"angular.module('"+ getFileName(dest) +"', [\n"
								+ list.map(function(file) {
									return '\t"' + getFileName(file) + '"'
								}).join(',\n')
							+ '\n'
							+ "]);"
						);

					}
				}
			}
		}
	});
};
