'use strict';

const fs = require('fs-extra');
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the primo ' + chalk.red('generator-maven') + ' generator!'
    ));

    const prompts = [{
      type: 'input',
      name: 'groupId',
      message: 'GroupId'
    }, {
      type: 'input',
      name: 'artifactId',
      message: 'ArtifactId'
    }, {
      type: 'input',
      name: 'version',
      message: 'Version',
      default: '1.0-SNAPSHOT'
    }];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  writing() {
    fs.copy(this.sourceRoot(), this.destinationRoot(), (error) => {
      if (error) {
        console.log(error);
      }
    })
  }
};
