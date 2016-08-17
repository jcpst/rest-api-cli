#!/usr/bin/env node
'use strict'

require('colors')
require('shelljs/global')

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

const noPathProvided = `
ERROR: Provide a [path] argument:
$ rest-api-cli app-name`.red

const gettingStarted = `
Done. Getting started:
  $ cd ${basename}
  $ npm run db
  $ npm start`.green

function convertPackageName () {
  const pkgJsonObj = require(packageJson)
  pkgJsonObj.name = basename
  const updatedPackageJson = JSON.stringify(pkgJsonObj, null, '  ')
  ShellString(updatedPackageJson).to(packageJson)
}

function build () {
  mkdir('-p', destDir)
  cp('-r', `${srcDir}/{*,.*}`, destDir)
  convertPackageName()
  echo(gettingStarted)
}

if (argv.h || argv.help) {
  echo(help)
} else if (!basename) {
  echo(noPathProvided)
  echo(help)
} else {
  build()
}

