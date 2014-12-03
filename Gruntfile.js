'use strict';

module.exports = function(grunt) {
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        sass: {
            dist: {
                options: {
                    style: 'compact'
                },
                files: {
                    'css/grid.css': 'sass/grid.sass',
                }
            }
        },
        cssmin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: 'css/',
                    src: ['*.css', '!*.min.css'],
                    dest: 'css/',
                    ext: '.min.css'
                }]
            }
        },
        autoprefixer: {
            dist: {
                expand: true,
                flatten: true,
                src: 'css/*.css', // -> src/css/file1.css, src/css/file2.css
                dest: 'css/' // -> dest/css/file1.css, dest/css/file2.css
            }
        },
        watch: {
            sass: {
                // We watch and compile sass files as normal but don't live reload here
                files: ['sass/*.sass'],
                tasks: ['sass:dist', 'autoprefixer:dist'],
            },
            cssmin: {
                files: ['css/*.css'],
                tasks: ['cssmin:dist']
            },
            files: {
                files: ['app/index.html'],
                tasks: ['cssmin:dist']
            },
            livereload: {
                // Here we watch the files the sass task will compile to
                // These files are sent to the live reload server after sass compiles to them
                options: {
                    livereload: true
                },
                files: ['css/**/*'],
            },
        },
    });
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-contrib-watch');
    // Default task(s).
    grunt.registerTask('default', ['sass', 'watch']);
};