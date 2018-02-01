'use strict';

const fs = require('fs-extra');
const path = require('path');
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay('Welcome to the primo ' + chalk.red('generator-maven') + ' generator!')
    );

    const prompts = [
      {
        type: 'input',
        name: 'groupId',
        message: 'GroupId'
      },
      {
        type: 'input',
        name: 'artifactId',
        message: 'ArtifactId'
      },
      {
        type: 'input',
        name: 'version',
        message: 'Version',
        default: '1.0-SNAPSHOT'
      }
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  writing() {
    this.fs.copyTpl(this.templatePath('pom.xml'), this.destinationPath('pom.xml'), {
      groupId: this.props.groupId,
      artifactId: this.props.artifactId,
      version: this.props.version
    });

    const folders = ['src/main/java', 'src/main/resources', 'src/test/java'];

    for (let i = 0; i < folders.length; i++) {
      fs.ensureDir(path.join(this.destinationRoot(), folders[i]), error => {
        if (error) {
          console.log(error);
        }
      });
    }
  }
};
