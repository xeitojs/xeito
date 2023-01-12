<h1 align="center">Xeito - Harness the power of the web.</h1>

<p align="center">
  <img src="https://aerotoad.github.io/xeito-docs/images/logo_gradient.svg" alt="xeito-logo" width="150px" height="150px"/>
  <br><br>
  <i>Xeito is a typescript framework for building web applications</i>
  <br>
</p>

<p align="center">
  <a href="https://aerotoad.github.io/xeito-docs/"><strong>Xeito Documentation</strong></a>
  <br>
</p>

<p align="center">
  <a href="https://www.npmjs.com/@xeito/core">
    <img src="https://img.shields.io/npm/v/@xeito/core.svg?logo=npm&logoColor=fff&label=NPM+package&color=f59e0b" alt="Xeito on npm" />
  </a>
  &nbsp;
  <a href="https://github.com/aerotoad/xeito/blob/main/LICENSE">
    <img src="https://img.shields.io/github/license/aerotoad/xeito" alt="License" />
  </a>
</p>

<hr>

## Xeito CLI

This is the CLI library for Xeito Framework.

Provides an easy way to start new Xeito projects and the boilerplate for new components and services.

To find the full documentation and more links go to the main [README file](https://github.com/aerotoad/xeito).

<hr>

## Installation:

```bash
$ npm install -g @xeito/cli
```

## Usage:
```bash	
$ xeito [command] [options]
```

## Commands:

### Create a new Xeito Project:
```bash
$ xeito new [project-name]
```

### Generate a new component or service:
```bash
$ xeito generate [component|service] [name]
```
*NOTE:* The name of the component or service must be in PascalCase, for example: `MyComponent` or `MyService`.

The component name can contain slashes to indicate a subfolder (if the folder does not exist, it will be created)

```bash
$ xeito generate component components/myComponent
```
This will create a new component in the `components` folder with the name `myComponent`.

### Help:
```bash
$ xeito help
```
