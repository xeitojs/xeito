<h1 align="center">Xeito - Harness the power of the web.</h1>

<p align="center">
  <!--<img src="aio/src/assets/images/logos/angular/angular.png" alt="angular-logo" width="120px" height="120px"/>-->
  <br>
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

## Xeito Injection

This is the Dependency Injection library for Xeito Framework. It provides the classes and decorators required to create and access singleton services.

To find the full documentation and more links go to the main [README file](https://github.com/aerotoad/xeito).

<hr>

## Exports:

### Classes:
- `Registry`: The class that manages the injection registry (used by the decorators, not intended to be used directly) __[Internal]__.

### Decorators:
- `Injectable`: Marks a class as a service and adds related functionality.
- `Inject`: Injects a service into a class (through a decorated property).

### Interfaces
- `InjectableMetadata`: The interface for injectable metadata (decorator).