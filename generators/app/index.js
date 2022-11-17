'use strict'

const fs = require('fs')
const Generator = require('yeoman-generator')

module.exports = class extends Generator {
  async prompting() {
    this.answers = await this.prompt([
      {
        type: 'input',
        name: 'element_name',
        message: 'Type the element name:',
        default: this.appname,
        filter: input => input.trim(),
        validate: input => !input ? 'Must enter a name' : true
      },
      {
        type: 'input',
        name: 'element_description',
        message: 'Type the element description:',
        filter: input => input.trim(),
        validate: input => !input ? 'Must enter a description' : true
      },
      {
        type: 'input',
        name: 'author',
        message: 'Type your Github username:',
        filter: input => input.trim().replaceAll('@', ''),
        validate: input => !input ? 'Must enter a username' : true
      },
    ])

    this.log('Generating element:', this.answers.element_name)
  }

  install() {
    this.npmInstall()
  }

  writing() {
    this.fs.copyTpl(
      this.templatePath('element'),
      this.destinationPath(),
      this.answers,
      null,
      { globOptions: { dot: true } }
    )

    this.fs.commit([], () => {
      fs.renameSync(`sample-element.html`, `${this.answers.element_name}.html`)
    })
  }
};
