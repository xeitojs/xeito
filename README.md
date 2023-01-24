<h1 align="center">Xeito</h1>

<p align="center">
  <img src="https://xeito.dev/images/logo_gradient.svg" alt="xeito-logo" width="150px" height="150px"/>
  <br><br>
  <h3 align="center">
    Harness the power of the web.
  </h3>
  <p align="center">
    Opinionated Typescript framework for building web applications.
  </p>
  <p align="center">
    <a href="https://xeito.dev"><strong>www.xeito.dev</strong></a>
  </p>
</p>


<p align="center">
  <a href="https://www.npmjs.com/@xeito/core">
    <img src="https://img.shields.io/npm/v/@xeito/core.svg?logo=npm&logoColor=fff&label=NPM+package&color=f59e0b" alt="Xeito on npm" />
  </a>
  &nbsp;
  <a href="https://github.com/aerotoad/xeito/blob/main/LICENSE">
    <img src="https://img.shields.io/github/license/aerotoad/xeito" alt="License" />
  </a>
  &nbsp;
  <a href="#" disabled>
    <img src="https://img.shields.io/badge/Project%20Status-Alpha-yellow?logo=git&logoColor=white" alt="Project Status" />
  </a>
  &nbsp;
  <a href="https://github.com/aerotoad/xeito/blob/main/CONTRIBUTING.md">
    <img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg" alt="PRs welcome!" />
  </a>
</p>

<br>

<p align="center">
  <b>:package: Components</b> |
  <b>:zap: Reactive</b> |
  <b>:world_map: Routing</b> |
  <b>:syringe: Dependency Injection</b> |
  <b>:electric_plug: Extensible</b>
</p>

## Description

Xeito is a framework for building efficient, scalable web applications using Typescript. It combines some of the best features of [Angular](https://angular.io/), [Vue](https://vuejs.org/), [React](https://reactjs.org/) and [Svelte](https://svelte.dev/) to provide you with amazing tools to build your next web application. Combining elements of Object Oriented Programming, Functional Programming and Reactive Programming, Xeito provides a unique development experience that is both powerful and easy to use.

Xeito doesn't try to reinvent the wheel, but rather provide a set of tools that can be used to build applications in a way that is familiar to developers. It is built on top of the [Web Components](https://developer.mozilla.org/en-US/docs/Web/Web_Components) standard, adding the necessary abstractions and handling the boilerplate and complexity
of the underlying technology.

_Please bear in mind that, while Xeito components are ultimately registered as custom elements, these are not designed to work outside of the Xeito runtime._

Under the hood, Xeito makes use of [µhtml](https://github.com/WebReflection/uhtml) to handle DOM updates and the template system, providing a VirtualDOM-less implementation with all of the advantages of more traditional JSX-based templates.
With a small footprint, Xeito also has a [Reactive Store system](https://xeito.dev/stores/what-is-a-store) very similar to [svelte/store](https://svelte.dev/docs#run-time-svelte-store) that can be used to share application state across components and services.

You can read more about these and many other features in the documentation website at [xeito.dev](https://xeito.dev).

> ***Note:*** _The framework is still in its early stages of development and is not yet ready for production use. However, you can try it out and give feedback on the [Github Discussions](https://github.com/aerotoad/xeito/discussions)_

## Getting Started

It's recommended to start with the [Quick Start](https://xeito.dev/guide/quick-start) guide to get a feel for the framework. Otherwise, you can follow the steps below to create a new project.

- Install the Xeito CLI globally:
```bash
$ npm install -g @xeito/cli
```

- Create a new project:
```bash
$ xeito new [PROJECT NAME]
```

- Go to the project directory, install the dependencies and run the application:
```bash
$ cd [PROJECT NAME]
$ npm install
$ npm start
```

These commands will generate a brand new Xeito project with the default features, including [Parcel](https://parceljs.org/) for bundling, [Sass](https://sass-lang.com/) for styling and [Typescript](https://www.typescriptlang.org/) as the main language.

If you want to jump straight into it, check the [Introduction](https://xeito.dev/guide/introduction) guide to get started.

Happy hacking! :tada:

## Packages

| Project | Package | Link | Version |
|---------|---------|------| ------- |
| Core | [@xeito/core](https://www.npmjs.com/package/@xeito/core) | [README.md](/packages/core/README.md) | [![npm version](https://badge.fury.io/js/%40xeito%2Fcore.svg)](https://badge.fury.io/js/%40xeito%2Fcore) |
| Injection | [@xeito/injection](https://www.npmjs.com/package/@xeito/injection) | [README.md](/packages/injection/README.md) | [![npm version](https://badge.fury.io/js/%40xeito%2Finjection.svg)](https://badge.fury.io/js/%40xeito%2Finjection) |
| Router | [@xeito/router](https://www.npmjs.com/package/@xeito/router) | [README.md](/packages/router/README.md) | [![npm version](https://badge.fury.io/js/%40xeito%2Frouter.svg)](https://badge.fury.io/js/%40xeito%2Frouter) |
| Store | [@xeito/store](https://www.npmjs.com/package/@xeito/store) | [README.md](/packages/store/README.md) | [![npm version](https://badge.fury.io/js/%40xeito%2Fstore.svg)](https://badge.fury.io/js/%40xeito%2Fstore) |
| CLI | [@xeito/cli](https://www.npmjs.com/package/@xeito/cli) | [README.md](/packages/cli/README.md) | [![npm version](https://badge.fury.io/js/%40xeito%2Fcli.svg)](https://badge.fury.io/js/%40xeito%2Fcli) |

All Xeito packages follow [Semantic Versioning](https://semver.org/) and their version numbers are synchronized.

_*Note:* During the prerelease phase, the version number will be `0.x.x` and the API may change between minor versions._

## Contributing

Thanks for your interest in contributing! Please, read on the guidelines for [contributing](CONTRIBUTING.md) and then check the [issues](https://github.com/aerotoad/xeito/issues) to see if there's anything you can help with.

Please note that this project is released with a [Contributor Code of Conduct](CODE_OF_CONDUCT.md). By participating in this project you agree to abide by its terms.

## Documentation

You can see the dedicated [repository](https://github.com/aerotoad/xeito-docs) or view the live documentation site at [xeito.dev](https://xeito.dev).

Below you can find a list of the most important guides to get you started with Xeito.

**Essentials**

- [Introduction](https://xeito.dev/guide/introduction)
- [Quick Start](https://xeito.dev/guide/quick-start)
- [Template Syntax](https://xeito.dev/essentials/template-syntax)
- [Component Structure](https://xeito.dev/components/structure)

**Reusability**

- [Services](https://xeito.dev/reusability/services)
- [Actions](https://xeito.dev/reusability/actions)
- [Pipes](https://xeito.dev/reusability/pipes)

**Reactivity**

- [What is a Store?](https://xeito.dev/stores/what-is-a-store)

**Advanced**

- [Plugins](https://xeito.dev/reusability/plugins)

## Stay in Touch

- Author - [Samuel Bazaga](https://twitter.com/aerotoad)
- Website - [xeito.dev](https://xeito.dev)
- Github Discussions - [Github Discussions](https://github.com/aerotoad/xeito/discussions)

## License

See the [LICENSE](LICENSE) file for license rights and limitations (MIT).
