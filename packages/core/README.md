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

## Xeito Core

This is the base library for Xeito Framework which provides the core functionality for the framework.

To find the full documentation and more links go to the main [README file](https://github.com/aerotoad/xeito).

<hr>

## Installation

```bash
npm install @xeito/core
```

## Exports:

### Core Classes:
- `Xeito`: The main class that is used to create a new Xeito Application.
- `XeitoComponent`: The class components extend from.
- `XeitoPlugin`: The class plugins extend from.

### Core Decorators:
- `Action`: Used to create an action for modifying elements.
- `Component`: Marks a class as a component and adds related functionality.
- `Event`: Creates a new event emitter in the component.
- `Global`: Allows access to global properties from inside a component.
- `Pipe`: Creates a new pipe for transforming data.
- `Prop`: Creates a new reactive property in the component.
- `Ref`: Syntactic sugar to access a `ref` of the template.
- `State`: Creates a reactive class property that triggers template updates.

### Interfaces
- `Emitter`: The interface for event emitters.
- `ActionMetadata`: The interface for action metadata (decorator).
- `ActionResult`: The interface for action results (return value).
- `AttributeChanges`: The interface for attribute changes (in `onChange()` method)
- `ComponentMetadata`: The interface for component metadata (decorator).
- `ElementRef`: The interface for element references (for `Ref()` decorator).
- `EventConfig`: The interface for event configuration (in `Event()` decorator).
- `PipeMetadata`: The interface for pipe metadata (decorator).

## Re-exports from [µhtml](https://github.com/WebReflection/uhtml):
- `html`: Tag for template literals that creates the template.
- `svg`: Tag for template literals for svg.
- `render`: Used to render the template in the specified element __[Internal].__
- `Hole`: __[Internal].__
- `Renderable`: __[Internal].__
- `TemplateFunction`: __[Internal].__
