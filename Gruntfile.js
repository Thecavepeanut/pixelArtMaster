module.exports = function (grunt) {
  require('load-grunt-tasks')(grunt);

  var COPY_RIGHT_BANNER =
    '/**************************************************************\n' +
    ' *       Copyright (c) 2015 MultiScale Health Networks.       *\n' +
    ' *                     All rights reserved.                   *\n' +
    ' **************************************************************/\n',
    autoprefixer = require('autoprefixer-core');


  grunt.initConfig({
    browserify: {
      dev: {
        // A single entry point for our app
        src: 'fe/ts/index.js',
        // Compile to a single file to add a script tag for in your HTML
        dest: 'public/js/index.js',
        options: {
          browserifyOptions: {
            paths: ['fe/components/node_modules', 'fe/ts'],
            debug: true
          },
          preBundleCB: function (bundle) {
            bundle.plugin('tsify', {});
          }
        }
      },
      dist: {
        // A single entry point for our app
        src: 'fe/ts/index.js',
        // Compile to a single file to add a script tag for in your HTML
        dest: 'public/js/index.js',
        options:{
          browserifyOptions: {
            paths:['fe/components/node_modules','fe/ts'],
            debug: true
          },
          preBundleCB: function (bundle) {
            bundle.plugin('tsify', { });
          }
        }
      }
    },
    copy: {
      dist: {
        expand: true,
        cwd: 'fe/components/assets',
        src: ['lib/fontawesome/fonts/*.*', 'images/*.*'],
        dest: 'app/assets/'
      },
      dev: {
        expand: true,
        cwd: 'fe/components/assets',
        src: ['lib/fontawesome/fonts/*.*', 'images/*.*'],
        dest: 'app/assets/'
      }
    },
    less: {
      dev: {
        options: {
          sourceMap: true
        },
        files: [{
          sourceMap:true,
          cwd: 'fe/less',
          src: ['main.less'],
          dest: 'app/assets/css',
          ext: '.css'
        }]
      },
      dist: {
        options: {
          sourceMap: true
        },
        files: [{
          expand: true,
          cwd: 'fe/less',
          src: ['main.less'],
          dest: 'app/assets/css/',
          ext: '.css'
        }]
      }
    },
    postcss: {
      options: {
        processors: [
          autoprefixer({browsers: ['last 2 version']}).postcss
        ]
      },
      dev: {
        src: 'app/assets/css/*.css'
      },
      dist: {
        src: ['app/assets/css/*.css']
      }
    },
    watch: {
      dev: {
        options: {
          livereload: true
        },
        files: [
          'fe/**/*.less',
          'fe/**/*.html',
          'fe/assets/stylesheets/*.less',
          'fe/**/*.ts'
        ],
        tasks: ['less:dist', 'postcss:dist', 'ts', 'browserify:dist']
      }
    },
    ts: {
      dev: {
        src: ['fe/ts/*.ts', '!node_modules/**/*.ts', '!bower_components/**/*.ts'],
        options: {
          module: "commonjs"
        }
      }
    },
    /**
     *  Minifies the JS for distribution.
     */
    uglify: {
      options: {
        banner: COPY_RIGHT_BANNER + '\n' //this one needs an extra new line.
      },
      dist: {
        files: {
          'app/assets/js/index.js': ['app/assets/js/index.js']
        }
      }
    }
  });

  // Load the npm installed tasks

  grunt.registerTask('default', ['less:dist', 'postcss:dist', 'ts', 'browserify:dist', 'copy:dist', 'watch']);
  grunt.registerTask('build', ['less:dist', 'ts', 'browserify:dist', 'copy:dist', 'uglify:dist']);

};
