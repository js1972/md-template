/*eslint-env node*/
'use strict';

module.exports = function(grunt) {

	grunt.initConfig({

		dir: {
			webapp: 'webapp',
			tests: 'test',
			dist: 'dist',
			bower_components: 'bower_components',
			localServerTestUrl : 'http://localhost:8080/test-resources'
		},

		connect: {
			options: {
				port: 8080,
				// Listen on all network interfaces instead of just the local
				// loopback, so that this works within Docker containers.
				// set to -> hostname: "0.0.0.0",
				hostname: '*',
				livereload: 35729
			},
			src: {},
			dist: {}
		},

		openui5_connect: {
			options: {
				resources: [
					'<%= dir.bower_components %>/openui5/src/sap.ui.core/src',
					'<%= dir.bower_components %>/openui5/src/sap.m/src',
					'<%= dir.bower_components %>/openui5/src/sap.ui.layout/src',
					'<%= dir.bower_components %>/openui5/src/themelib_sap_bluecrystal/src'
				]
			},
			src: {
				options: {
					appresources: ['<%= dir.webapp %>'],
					testresources: [ '<%= dir.tests %>']
				}
			},
			dist: {
				options: {
					appresources: '<%= dir.dist %>'
				}
			}
		},

		openui5_preload: {
			component: {
				options: {
					resources: {
						cwd: '<%= dir.webapp %>',
						prefix: 'sap/ui/demo/mdtemplate'  //'todo'
					},
					dest: '<%= dir.dist %>'
				},
				components: true
			}
		},

		clean: {
			dist: '<%= dir.dist %>/'
		},

		copy: {
			dist: {
				files: [ {
					expand: true,
					cwd: '<%= dir.webapp %>',
					src: [
						'**',
						'!test/**'
					],
					dest: '<%= dir.dist %>'
				} ]
			}
		},

		eslint: {
			options: {
				quiet: true
			},

			all: ['<%= dir.tests %>', '<%= dir.webapp %>'],
			webapp: ['<%= dir.webapp %>']
			},

		qunit: {
			options: {
				/* for debugging*/
				'--remote-debugger-autorun' : 'yes',
				'--remote-debugger-port' : 8081
			},

			unit: {
				options: {
					urls: [
						'<%= dir.localServerTestUrl %>/unit/UnitTestsGrunt.qunit.html'
					]
				}

			},
			opa: {
				options: {
					urls: [
						'<%= dir.localServerTestUrl %>/opa/OpaTestsGrunt.qunit.html'
					],
					// same as qunits timeout 90 seconds since opa test might take a while
					timeout: 120000
				}

			}
		},

		watch: {
			webapp: {
				files: "<%= dir.webapp %>/**",
				tasks: ["eslint"]
			},
			livereload: {
				options: {
					livereload: "<%= connect.options.livereload %>"
				},
				files: [
					"<%= dir.webapp %>/**"
				]
			}
		}

	});

	// These plugins provide necessary tasks.
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-openui5');
	grunt.loadNpmTasks('grunt-eslint');
	grunt.loadNpmTasks('grunt-contrib-qunit');
	grunt.loadNpmTasks("grunt-contrib-watch");

	// Server task
	grunt.registerTask('serve', function(target) {
		grunt.task.run('openui5_connect:' + (target || 'src') + ':keepalive');
	});
	
	// Server task - with live reloading
	grunt.registerTask('serveLive', function(target) {
		grunt.task.run("openui5_connect:" + (target || "src:livereload"));
		grunt.task.run("watch");
	});

	// Linting task
	grunt.registerTask('lint', ['eslint:all']);

	// Build task
	grunt.registerTask('build', ['openui5_preload', 'copy']);

	// Test task
	grunt.registerTask('test', ['openui5_connect:src:keepalive', 'qunit:unit', 'qunit:opa']);
	grunt.registerTask('unitTest', ['openui5_connect:src:keepalive', 'qunit:unit']);
	grunt.registerTask('opaTest', ['openui5_connect:src:keepalive', 'qunit:opa']);

	// Default task
	grunt.registerTask('default', [
		'lint:all',
		'test'
	]);
};
