#!/usr/bin/env node
'use strict'

const color = require('colors')
const sh = require('shelljs')

const path = require('path')
const argv = require('minimist')(process.argv.slice(2))
const basename = argv._[0] || ''
const cwd = process.cwd()
const destDir = path.join(cwd, basename)
const thisDir = path.dirname(__filename)
const srcDir = path.join(thisDir, 'assets')
const packageJson = path.join(destDir, 'package.json')

const help = `
Usage:
  rest-api-cli [dir]
  -h, --help            Display this information

Scaffold out a basic REST API app into new directory.`

const noPathProvided = color.red(`
ERROR: Provide a [path] argument:
$ rest-api-cli app-name
`)

const gettingStarted = color.green(`
Done. Getting started:
  $ cd ${basename}
  $ npm run db
  $ npm start
`)

function convertPackageName () {
  const pkgJsonObj = require(packageJson)
  pkgJsonObj.name = basename
  const updatedPackageJson = JSON.stringify(pkgJsonObj, null, '  ')
  sh.ShellString(updatedPackageJson).to(packageJson)
}

function build () {
  sh.mkdir('-p', destDir)
  sh.cp('-r', `${srcDir}/{*,.*}`, destDir)
  convertPackageName()
  sh.echo(gettingStarted)
}

if (argv.h || argv.help) {
  sh.echo(help)
} else if (!basename) {
  sh.echo(noPathProvided)
  sh.echo(help)
} else {
  build()
}

