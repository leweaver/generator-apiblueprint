var generators = require('yeoman-generator');

module.exports = generators.Base.extend({
  constructor: function() {
    generators.Base.apply(this, arguments);
  },

  prompting: function () {
      var done = this.async();
      this.prompt([{
          type    : 'input',
          name    : 'name',
          message : 'Your project name',
          default : this.appname // Default to current folder name
      },{
          type    : 'input',
          name    : 'realname',
          message : 'Your name',
          default : ''
      },{
          type    : 'input',
          name    : 'apiname',
          message : 'API name',
          default : this.appname + ' RESTful API'
      },{
          type    : 'input',
          name    : 'description',
          message : 'API description'
      }], function (answers) {
          this.log(answers.name);
          this.name = answers.name;
          this.realname = answers.realname;
          this.apiname = answers.apiname;
          this.description = answers.description;
          done();
      }.bind(this));
  },

  writing: function() {
    
    this.gruntfile.prependJavaScript('require(\'load-grunt-tasks\')(grunt);');

    this.gruntfile.insertConfig("aglio", JSON.stringify({
            all:{
                files:{
                    "dist/index.html": ["src/index.apib"]
                },
                options: {
                    theme: "slate",
                    separator: "\\n",
                    includePath: "src"
                }
            }
        }));
    this.gruntfile.insertConfig("watch", JSON.stringify({
            aglio: {
                files: ['src/**/*.apib', 'src/**/*.md', 'src/**/*.json'],
                tasks: ['aglio'],
                options: {
                    livereload: '<%= connect.options.livereload %>'
                }
            }
        }));
    this.gruntfile.insertConfig("connect", ""+
        "{" +
            "options: {"+
                "port: 9000,"+
                //"// Change this to \\'0.0.0.0\\' to access the server from outside."+
                "hostname: 'localhost',"+
                "livereload: 35729"+
            "},"+
            "livereload: {"+
                "options: {"+
                    "open: false,"+
                    "base: 'dist'"+
                "}"+
            "}"+
        "}");

    this.gruntfile.registerTask('build', ['aglio']);
    this.gruntfile.registerTask('serve', ['build','connect:livereload','watch']);
    
    this.template('_package.json', 'package.json');
    this.template('README.md', 'README.md');
    this.template('index.apib', 'src/index.apib');
    this.template('api-module.apib', 'src/modules/api-module.apib');
  },

  installing: function() {

    this.npmInstall([
            'grunt',
            'grunt-aglio', 
            'grunt-contrib-connect', 
            'grunt-contrib-watch', 
            'load-grunt-tasks',
            'time-grunt'
        ],
        { 'saveDev': true });
  }

});