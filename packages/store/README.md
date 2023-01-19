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

## Xeito Store

This is the Router library for Xeito Framework.
Provides a simple yet powerful router for web applications built with Xeito.

To find the full documentation and more links go to the main [README file](https://github.com/aerotoad/xeito).

<hr>

## Table of Contents
- [Xeito Store](#xeito-store)
- [Table of Contents](#table-of-contents)
- [Exports](#exports)
  - [Classes](#classes)
  - [Interfaces](#interfaces)
- [What is a store?](#what-is-a-store)
- [WriteStore](#writestore)
  - [Updater function](#updater-function)
- [ReadStore](#readstore)
- [Mixed Store](#mixed-store)

## Exports

### Classes
- `WriteStore`: A store that can be written to and read from.
- `ReadStore`: A store that can only be read from.
- `MixedStore`: A store that depends on other stores.

### Interfaces
- `Updater`: A function that can be passed to a store to update its value.
- `Subscription`: Object returned from a store's `subscribe` method. Contains a `unsubscribe` method to unsubscribe from the store.

## What is a store?

At its core, a store is a class that holds a value that changes over time, allowing you to subscribe to it.
Stores allow the state of your application to be shared across multiple components and services or even regular Typescript modules.

There are three main types of stores, each with a different purpose, but a very similar API.

## WriteStore

The most basic form of a store is a `WriteStore`, which allows us to write to it and notify subscribers of the change.
Let's create a simple store that holds a number:

```typescript
import { WriteStore } from '@xeito/store';

const store = new WriteStore(0);
```

Now we can subscribe to the store and get notified when the value changes:

```typescript
store.subscribe((value) => {
  console.log(value);
});
```
Stores are fully typed, so you can rewrite the above code as:

```typescript
import { WriteStore } from '@xeito/store';

const store: WriteStore<number> = new WriteStore(0);

store.subscribe((value: number) => {
  console.log(value);
});
```

We can now write to the store and notify subscribers:

```typescript
store.set(1); // Every subscriber will be notified with the new value
```

We can also get the current value of a store without subscribing to it:

```typescript
const value = store.value;
```
__Note:__ Reading the value of a store like this will not create a subscription and it won't be notified of any changes.

### Updater function

We can also pass an updater function when creating a `WriteStore`, this function will be called with the current value of the store and the `set` method. This allows us to transform the value and write it to the store in a single operation:

```typescript
const store = new WriteStore(0, (value, set) => {
  set(value + 1);
});
```
Updater functions can return return a value or a cleanup function.
If a cleanup function is returned, it will be called when the store is destroyed.

```typescript
const store = new WriteStore(0, (value, set) => {
  const interval = setInterval(() => {
    set(value + 1);
  }, 1000);

  return () => {
    clearInterval(interval);
  };
});
```
If the updater returns a value, it will be set as the value of the store.

```typescript
const store = new WriteStore(0, (value, set) => {
  return value + 1;
});

// This can also be written as:
const store = new WriteStore(0, (value, set) => value + 1);
```

The updater function can be changed after the store is created by using the `update` method:

```typescript
store.update((value, set) => {
  return value + 1;
});
```

## ReadStore

A `ReadStore` is a store that can only be read from, it can't be written to.
This is useful when you want to share a value across multiple components or services, but you don't want them to be able to change it. ReadStore therefore only has a `subscribe` method and a `value` property and relies on the updater function to change its value.

```typescript
import { ReadStore } from '@xeito/store';

const store = new ReadStore(0);

store.subscribe((value) => {
  console.log(value); // Logs 0
});
```
This can be useful for tasks like fetching data from an API and sharing it across multiple components without them being able to change it:

```typescript
import { ReadStore } from '@xeito/store';

const store = new ReadStore(0, async (value, set) => {
  const response = await fetch('https://example.com/api');
  const data = await response.json();

  set(data);
});

store.subscribe((value) => {
  console.log(value); // Logs the data from the API
});
```

## Mixed Store

A `MixedStore` is a type of store that depends on other stores to calculate its value, it can be read from and written to.
This is useful when you need to merge data from multiple stores or compute a value when any of the store passed as a dependency changes.

```typescript
import { WriteStore, MixedStore } from '@xeito/store';

const count = new WriteStore(0);

const store = new MixedStore(count, (value, set) => {
  return value + 1;
});

store.subscribe((value) => {
  console.log(value); // Logs 1
});
```

As you can see, the `MixedStore` accepts a store as its first argument, this store will be used to calculate the value of the `MixedStore`, the updater function will be called with the value of the store and the `set` method.
A third argument can be provided, this argument will be the initial value of the `MixedStore`:

```typescript
const store = new MixedStore(count, (value, set) => {
  return value + 1;
}, 0); // The initial value of the store will be 0
```

If we need to use multiple stores to calculate the value of the `MixedStore`, we can pass them as an array:

```typescript
const value1 = new WriteStore('Hello');
const value2 = new WriteStore('World');

const store = new MixedStore([value1, value2], (value, set) => {
  return value.join(' ');
});

store.subscribe((value) => {
  console.log(value); // Logs 'Hello World'
});

value1.set('Goodbye'); // Logs 'Goodbye World' in the subscriber
```