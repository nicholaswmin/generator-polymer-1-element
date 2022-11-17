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
        transformer: input => input.trim(),
        validate: input => {
          if (input.split('-').length <= 1)
            return 'Element name must contain at least 2 words separated by a hyphen (i.e hello-world).'

          return true
        }
      },
      {
        type: 'input',
        name: 'element_description',
        message: 'Type the element description:',
        transformer: input => input.trim()
      },
      {
        type: 'input',
        name: 'author',
        message: 'Type your Github username:',
        transformer: input => {
          input = input.trim()

          if (input[0] === '@')
            input = input.slice(1, input.length)

          return input
        }
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
