'use strict'

const fs = require('fs')
const Generator = require('yeoman-generator')

module.exports = class extends Generator {
  async prompting() {
    this.answers = await this.prompt([
      {
        type: 'input',
        name: 'element_name',
        message: 'Type the element name',
        default: this.appname,
        validate: input => {
          if (input.split('-').length <= 1)
            return 'Element name must contain at least 2 words separated by a hyphen (i.e hello-world).'

          return true
        }
      },
      {
        type: 'input',
        name: 'element_description',
        message: 'Type the element description'
      },
      {
        type: 'input',
        name: 'author',
        message: 'Type the Github author handle',
        validate: input => {
          if (input.includes('@'))
            return "Do not include @ in author name. We'll generate it for you."

          return true
        }
      },
    ])

    this.log('Generating element:', this.answers.element_name)
  }

  writing() {
    const dest = this.destinationPath(this.answers.element_name)
    this.fs.copyTpl(
      this.templatePath('element'),
      this.destinationPath(this.answers.element_name),
      {
        ...this.answers,
        year: (new Date).getFullYear()
      },
      null,
      { globOptions: { dot: true } }
    )

    this.fs.commit([], () => {
      fs.renameSync(`${dest}/sample-element.html`, `${dest}/${this.answers.element_name}.html`)
      fs.renameSync(`${dest}/gitignore`, `${dest}/.gitignore`)
      this.spawnCommand('npm', ['install'], { cwd: this.answers.element_name })
    })
  }
};
