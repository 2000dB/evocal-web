/*global module:false*/
module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        // Metadata.
        pkg: grunt.file.readJSON('package.json'),
        banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
            '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
            '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
            '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
            ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',

        
        copy: {
            main: {
                files: [{
                    expand: true,
                    cwd: 'src/',
                    src: ['**'],
                    dest: 'public/'
                }]
            }
        },

        replace: {
            example: {
                src: ['public/*.html', 'public/*.html', 'public/css/*.css'],           // source files array (supports minimatch)
                overwrite: true,
                replacements: [{
                    from: 'http://localhost/~vdb/evocal-web/src/',
                    //to: 'http://localhost/~vdb/evocal-web/public/'
                    to: 'http://evoc.al/'
                }, {
                    from: '<analytics></analytics>',
                    to: "<script>(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)})(window,document,'script','//www.google-analytics.com/analytics.js','ga');ga('create', 'UA-69336628-1', 'auto');ga('send', 'pageview');</script>"
                }]
            }
        },

        cssmin: {
            dist: {
                options: {
                    shorthandCompacting: false
                },
                files: [{
                    expand: true,
                    cwd: 'public',
                    src: '{,**/}*.css',
                    dest: 'public'
                }]
            }
        },

        uglify: {
            dist: {
                options: {
                },
                files: [{
                    expand: true,
                    cwd: 'public',
                    src: ['{,**/}*.js', '!/js/jquery-ui.min.js', '!/js/jquery.min.js'],
                    dest: 'public'
                }]
            }
        },
        

        htmlmin: {                                     
            dist: {                                    
                options: {                             
                    removeComments: true,
                    collapseWhitespace: true,
                    preserveLineBreaks: true,
                },
                files: [{
                    expand: true,
                    cwd: 'public',
                    src: '{,**/}*.html',
                    dest: 'public'
                }]
            }
        },

    });

    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-text-replace');
    
    // grunt.registerTask('html', ['htmlmin']);
    // grunt.registerTask('css', ['cssmin']);
    // grunt.registerTask('js', ['uglify']);
    // grunt.registerTask('cp', ['copy']);

    grunt.registerTask('default', ['copy', 'htmlmin', 'cssmin', 'uglify', 'replace']);
};
