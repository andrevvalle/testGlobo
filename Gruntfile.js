module.exports = function(grunt) {
	
	var jsFiles = [
		'node_modules/jade/runtime.js',
		'vendor/modernizr/modernizr.js',
	    'vendor/jquery/dist/jquery.js',
	    'assets/javascrips/**/*.js'
	];

	grunt.initConfig({
		sass: {
			dist: {
				options: {
					style: 'expanded',
					sourcemap: 'none'
				},
				files: {
					'public/stylesheets/normalize.css': 'vendor/foundation/scss/normalize.scss',
					'public/stylesheets/grid.css': 'vendor/foundation/scss/foundation.scss',
					'public/stylesheets/main.css': 'assets/stylesheets/main.sass'
				}
			}
		},
		cssmin: {
			target: {
				files: {
					'public/stylesheets/main.min.css': ['public/stylesheets/normalize.css', 'public/stylesheets/grid.css', 'public/stylesheets/main.css']
				}
			}
		},
		concat: {
			dist: {
		      src: jsFiles,
		      dest: 'public/javascrips/main.js',
		    }
		},
		uglify: {
			options: {
				mangle: {
					except: ['jQuery']
				}
			},
			my_target: {
				files: {
					'public/javascrips/main.min.js': ['public/javascrips/main.js']
				}
			}
		},
		imagemin: {
			dynamic: {
				files: [{
					expand: true,
					cwd: 'assets/images/',
					src: ['**/*.{png,jpg}'],
					dest: 'public/images/'
				}]
			}
		},
		jade: {
			options: {
        		pretty: true	
			},
			template: {
				options: {
					client: true,
					namespace: 'Feed.templates',
					processName: function(filename) {
						return filename.replace(/^views\/templates\/(.*?)\.jade$/, '$1');
					}
				},
				expand: true,
				cwd: 'views/templates/',
				src: ['**/*.jade'],
				dest: 'assets/javascrips/feed/templates/',
				ext: '.js'
			}
		},
		watch: {
			gruntfile: {
				files: ['Gruntfile.js']
			},
			sass: {
				files: ['assets/stylesheets/*.sass'],
				tasks: ['sass']
			},
			cssmin: {
				files: ['public/stylesheets/main.css'],
				tasks: ['cssmin']
			},
			css: {
				files: ['public/stylesheets/main.min.css'],
				options: {
					livereload: true
				}
			},
			concat: {
				files: jsFiles,
				tasks: ['concat']
			},
			uglify: {
				files: ['public/javascrips/main.js'],
				tasks: ['uglify'],
				options: {
					livereload: true
				}
			},
			imagemin: {
				files: ['assets/images/*.{png,jpg}'],
				tasks: ['imagemin']
			},
			jadelive: {
				files: ['views/**/*.jade'],
				options: {
					livereload: true
				}
			},
			jade: {
				files: ['views/templates/**/*.jade'],
				tasks: ['jade']
			}
		}
	});

	grunt.registerTask('default', function(){
		grunt.task.run(['watch']);
		grunt.log.ok('Watching: Test Globo.com');
	});

	grunt.registerTask('image', function(){
		grunt.task.run(['imagemin']);
	});

	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-imagemin');
	grunt.loadNpmTasks('grunt-contrib-jade');
};