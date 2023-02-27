# Changelog

All notable changes to this project will be documented in this file. See [commit-and-tag-version](https://github.com/absolute-version/commit-and-tag-version) for commit guidelines.

### [0.3.4](https://github.com/aerotoad/xeito/compare/v0.3.3...v0.3.4) (2023-02-27)


### Features

* **cli:** Use new vite starters repo ([1ec3ad7](https://github.com/aerotoad/xeito/commit/1ec3ad7a58ddd88af8448bec4fe5c30ab8a7f7ab))

### [0.3.3](https://github.com/aerotoad/xeito/compare/v0.3.2...v0.3.3) (2023-02-21)


### Bug Fixes

* **cli:** Missing file in package.json ([146ff62](https://github.com/aerotoad/xeito/commit/146ff62faee300409bedc723846431f35db383bb))

### [0.3.2](https://github.com/aerotoad/xeito/compare/v0.3.1...v0.3.2) (2023-02-21)


### Bug Fixes

* **core:** Wrong shadow initialization ([cd4e483](https://github.com/aerotoad/xeito/commit/cd4e4833ea7641ea6adb3cc554d3291d522c35cc))

### [0.3.1](https://github.com/aerotoad/xeito/compare/v0.3.0...v0.3.1) (2023-02-21)

## [0.3.0](https://github.com/aerotoad/xeito/compare/v0.2.2...v0.3.0) (2023-02-21)


### ⚠ BREAKING CHANGES

* **core:** `static styles()` and the `css` tag are no longer supported (xeito now relies on global css and bundler scoping)
* **core:** `Xeito.useStylesheet()` has been removed
* **core:** `Xeito.useConfig()` has been removed, shadowDOM can be toggled per component only.

* **core:** Remove support for shadow styles and global config ([5c94fa6](https://github.com/aerotoad/xeito/commit/5c94fa6f3b705cb42218233664c67c9e761102fc))

### [0.2.2](https://github.com/aerotoad/xeito/compare/v0.2.1...v0.2.2) (2023-02-08)


### ⚠ BREAKING CHANGES

* **core:** All components use shadowDOM by default now, unless specified otherwise in the `@Component()` decorator.
* **router:** Properties that were MixedStore before now are exposed as ReadStore
* **store:** MixedStore has been renamed as DerivedStore.
* **store:** Constructor callbacks and update methods now work the same as svelte/store

### Features

* **core:** Add ability to provide global configuration ([80d0dad](https://github.com/aerotoad/xeito/commit/80d0dad10b55e482bdaa2d956642258391372b1a))
* **core:** Add ability to provide global configuration ([0a8e2be](https://github.com/aerotoad/xeito/commit/0a8e2bea19750a55707424eafd6a702251a68244))
* **core:** Add support for scoped styles and global styles ([1370549](https://github.com/aerotoad/xeito/commit/1370549077ffe0b846bd41d054a7ab20177b4bac))
* **core:** Add support for shadowMode in component metadata ([f83d5b9](https://github.com/aerotoad/xeito/commit/f83d5b93bb1760594c9ab5801cd64f3ba84621cf))
* **flow:** Add basic flow control components ([495b0a9](https://github.com/aerotoad/xeito/commit/495b0a9fdc8fcecf7a05680779f5676345727829))


### Bug Fixes

* Add missing export for the `css` tag ([43f5fc2](https://github.com/aerotoad/xeito/commit/43f5fc24e4414d271bcb9d90ab3998abe3ecb481))
* **core:** Add missing `@Watch()` export ([cdbc3da](https://github.com/aerotoad/xeito/commit/cdbc3da5290379c43fd72be3e1cde1769b8a09f9))
* **core:** Don't add null styles ([8c83183](https://github.com/aerotoad/xeito/commit/8c83183beb521a050fa737e1a8e3d094f9256f39))
* **core:** Styles can be either array or css tag ([220e1ee](https://github.com/aerotoad/xeito/commit/220e1eee892e6fadc6d66e6d601b15b59e5fa0e1))
* **core:** Wrong array type ([41aeca7](https://github.com/aerotoad/xeito/commit/41aeca7711cfd50d34ecce3a4aac25189f9067bb))
* Load stylesheets correctly when none are provided by the component ([a31f494](https://github.com/aerotoad/xeito/commit/a31f49428dbd5b27399823c1e7687fa2cf24e8ad))
* Remove leftover log ([2b57ca0](https://github.com/aerotoad/xeito/commit/2b57ca0406c3586ec2d0e105c44c1b70d11653bb))
* Remove leftover log ([d9893a9](https://github.com/aerotoad/xeito/commit/d9893a92c1ed82c83be3d75861f1ced44ad907aa))
* **router:** Router params now only emit on diferent value ([b076338](https://github.com/aerotoad/xeito/commit/b076338c23c64dc99975e5320284d7ab42c20f53))
* **router:** Router slot now works with shadow dom and light dom ([b9e3d60](https://github.com/aerotoad/xeito/commit/b9e3d60ef760baaf8a9d891a88f45f671d0252f7))
* **router:** Use location store instead of function ([148b8bb](https://github.com/aerotoad/xeito/commit/148b8bbee5b5e3ab759fc71ba880f27704532205))


* **router:** Use new store types ([164f0b8](https://github.com/aerotoad/xeito/commit/164f0b808d8982e38adfe7b8d7faaee458d2e9cf))
* **store:** Refactor stores and simplify logic  ([334e225](https://github.com/aerotoad/xeito/commit/334e2257e5e9addc50cc2f573640a1bc6a3dd6fb))

### [0.2.1](https://github.com/aerotoad/xeito/compare/v0.2.0...v0.2.1) (2023-01-23)


### Features

* **CLI:** Add generators for Pipes and Actions ([4e4d06a](https://github.com/aerotoad/xeito/commit/4e4d06a728d683bf75259b1f0f46edbf1469a66b))


### Bug Fixes

* Service command now calls createService instead of createComponent ([9848076](https://github.com/aerotoad/xeito/commit/984807669e6f14c2b395480a1ea7ff0de748b66b))
* Use case-anything to make generators more resilient ([06863da](https://github.com/aerotoad/xeito/commit/06863da032e6dbac39e1e40a2069721bc5d31de7))

## [0.2.0](https://github.com/aerotoad/xeito/compare/v0.1.13...v0.2.0) (2023-01-20)


### ⚠ BREAKING CHANGES

* **router:** `onRouteUpdate` is now called `routeUpdate` and is a MixedStore.
* **router:** `getRouteParams` is now called `routeParams` and is a MixedStore.
* **router:** `getLocation` is now called `location` and is a MixedStore.

### Features

* **router:** Migrate router from Rxjs to Xeito Stores ([27278da](https://github.com/aerotoad/xeito/commit/27278dab345b7303f7c6a15d92cda67a7472f8d9))
* **store:** Add set check to emit only once a value has been set ([e2ceb59](https://github.com/aerotoad/xeito/commit/e2ceb595b357b0c30c9366b2fea8e7d8f0e09e23))


### Bug Fixes

* **store:** Remove wrong complete check ([847a960](https://github.com/aerotoad/xeito/commit/847a960c642a15b2d39296018bec4c73e4091246))

### [0.1.13](https://github.com/aerotoad/xeito/compare/v0.1.12...v0.1.13) (2023-01-20)


### ⚠ BREAKING CHANGES

* **store:** Stores no longer 'complete' on last unsubscribe, they are kept alive.
* **store:** The endUpdater function gets called before every updater call.

### Features

* **store:** Remove complete store state and call endUpdater on callback ([f5e90f9](https://github.com/aerotoad/xeito/commit/f5e90f9c829d2173e2274c3f5240df9305e6be9e))

### [0.1.12](https://github.com/aerotoad/xeito/compare/v0.1.11...v0.1.12) (2023-01-19)


### Features

* **router:** Update router to use functions and replace observables  ([bc51358](https://github.com/aerotoad/xeito/commit/bc5135812edffba2402c9c655eeb7d085cc1bb62))
* **store:** Add first implementation of stores ([580d14d](https://github.com/aerotoad/xeito/commit/580d14dbe7cf07879d356b9da7a70ecd33a92e8d))
* **store:** Add support for stores in state decorated properties ([35b2ef0](https://github.com/aerotoad/xeito/commit/35b2ef02fd32c8d2870aea49aaaedcbdaf2ccf49))


### Bug Fixes

* **router:** Add missing exports ([8d36149](https://github.com/aerotoad/xeito/commit/8d36149b4a48eb8b246b65a93555d66230da4936))
* **store:** Add missing index file to project ([57f3681](https://github.com/aerotoad/xeito/commit/57f3681d7dfeaf032f9046185aace0d1719df022))

### [0.1.11](https://github.com/aerotoad/xeito/compare/v0.1.10...v0.1.11) (2023-01-17)


### ⚠ BREAKING CHANGES

* Actions now need a `setup()` method to work.
 
- Now it's possible to add a `cleanup()` method to an action that gets called on every update to allow event management.
- Now it's possible to add a `destroy()` method to a pipe that will be called when a commponent unmounts.
* **styles:** Styles in decorator are no longer supported. Styles can now be added to the template normally by using the `style` tag.

### Features

* Add cleanup and destroy methods to actions and pipes ([75efbd2](https://github.com/aerotoad/xeito/commit/75efbd2b6dc54dce0f8917a24e3a3f602c028983))
* **component:** Validate component tag ([cc641fc](https://github.com/aerotoad/xeito/commit/cc641fcf20f811f085a381476020ac0ced931765))


* **styles:** Remove styles from component metadata ([ed18323](https://github.com/aerotoad/xeito/commit/ed183237531bc52aef88eef8d966fbb0f2b927b3))

### [0.1.10](https://github.com/aerotoad/xeito/compare/v0.1.9...v0.1.10) (2023-01-13)


### Features

* **watch:** Add watcher support for properties ([70798f2](https://github.com/aerotoad/xeito/commit/70798f2ae4712f626e67f989b51915708ee87921))

### [0.1.9](https://github.com/aerotoad/xeito/compare/v0.1.8...v0.1.9) (2023-01-13)


### Features

* **watch:** Add `@Watch()` decorator ([b0b43bd](https://github.com/aerotoad/xeito/commit/b0b43bd99c9a70f78022ac6e3bb63ce300fe38e3))

### [0.1.8](https://github.com/aerotoad/xeito/compare/v0.1.7...v0.1.8) (2023-01-12)


### ⚠ BREAKING CHANGES

* onChanges() method replaced by onPropChange().
* Interface AttributeChanges renamed as PropChange.

* !refactor(props): Rename mehthod an interface for prop changes  ([bd1e241](https://github.com/aerotoad/xeito/commit/bd1e241b41e352d4a7382546190cc967d846145a))

### [0.1.7](https://github.com/aerotoad/xeito/compare/v0.1.6...v0.1.7) (2023-01-10)

### [0.1.6](https://github.com/aerotoad/xeito/compare/v0.0.6...v0.1.6) (2023-01-10)


### Features

* **actions:** Add action decorator ([668b21a](https://github.com/aerotoad/xeito/commit/668b21a4c6453e8340d89c58b371b859858dde46))
* Add .xeitorc to generated projects ([4c2b843](https://github.com/aerotoad/xeito/commit/4c2b84371ac68acad51612094c34baa6f0a039dc))
* Add base Xeito class ([da1bdd4](https://github.com/aerotoad/xeito/commit/da1bdd46e62fb3ef185aa0177fd1c3822dfaac81))
* Add component decorator ([21216bd](https://github.com/aerotoad/xeito/commit/21216bd8f27d348618d72c6774d309c86084b565))
* Add decorator to access global properties ([a70f0f2](https://github.com/aerotoad/xeito/commit/a70f0f2bd0ce6979374680132f9ca87dd449019d))
* Add event decorator ([aaa6ae7](https://github.com/aerotoad/xeito/commit/aaa6ae70993367475676a8192b8661195eb6ed78))
* Add new uhtml dependency ([33d3f2d](https://github.com/aerotoad/xeito/commit/33d3f2dc14f70e1348cb44df9d342925eed0b7e3))
* Add prop and emit decorators and functionality ([4e23c89](https://github.com/aerotoad/xeito/commit/4e23c89e5dc456f63a729ab107bcfe63534e1723))
* Add prop decorator ([ec4ac6a](https://github.com/aerotoad/xeito/commit/ec4ac6a86f29023617d72bbe17b56a16520a4d5b))
* Add Ref decorator ([9e69d00](https://github.com/aerotoad/xeito/commit/9e69d0073c2a91339a0705cfe362d113f362f1ad))
* Add State decorator ([7444b7d](https://github.com/aerotoad/xeito/commit/7444b7d3cec603e0bdaee0c9435254bda3516fc4))
* Add support for plugins and global actions ([1088d38](https://github.com/aerotoad/xeito/commit/1088d384428c1b6c866039c8ff8466ba6586c5e2))
* Add XeitoComponent base class and required interfaces ([37ed0ea](https://github.com/aerotoad/xeito/commit/37ed0eaf7fcfaee804615e4154dbe73b35be7743))
* **batching:** Add batched updates  ([d07ee05](https://github.com/aerotoad/xeito/commit/d07ee05b95bd0839c06116d468ae7650cf340013))
* Change lifecycle methods and update logic ([e913fe4](https://github.com/aerotoad/xeito/commit/e913fe411ba65130fe62902ae2b524a13b87c0b1))
* **component:** Handle component style injection ([d9de706](https://github.com/aerotoad/xeito/commit/d9de706ebd59e905f0d481155a785a62b2d30e11))
* **components:** Pass the component data as a custom object ([31bb30f](https://github.com/aerotoad/xeito/commit/31bb30f4d7b964dc10dda0c792663abb57d03373))
* **core:** Add component hooks ([b064953](https://github.com/aerotoad/xeito/commit/b064953d52f62da09b1fe989e8daf3ac0bc40dbf))
* **core:** Update exports ([233e6d3](https://github.com/aerotoad/xeito/commit/233e6d340ff420fd4e6582e156bfc315935c02c3))
* Export core interfaces as types ([d429751](https://github.com/aerotoad/xeito/commit/d42975112ff59418bedb4a574089d8a0e5a4fd32))
* **generators:** Update component generator to use new core structure ([23f45c4](https://github.com/aerotoad/xeito/commit/23f45c40bee3857e23f4070b43b799df814fce57))
* **global decorator:** Allow explicit key lookup ([080f62f](https://github.com/aerotoad/xeito/commit/080f62f9ecab69e6b84ebe66936705c6a5c1483a))
* Move logic away from decorator and separate state and props ([9bc5506](https://github.com/aerotoad/xeito/commit/9bc5506eb50f28ac924aec96aa2f2af7c71c6695))
* **pipe:** Cache and return previous value if no change is detected ([d072eb9](https://github.com/aerotoad/xeito/commit/d072eb96d06547603217ebebd8c7643b489ed895))
* **pipes:** Add support for global pipes ([0501c62](https://github.com/aerotoad/xeito/commit/0501c62a9f9a3436bc2f0798ed9a977e65875378))
* **pipes:** Add support for pipes ([97d822c](https://github.com/aerotoad/xeito/commit/97d822ca04fc93c22e5ef26d0ede40c01059af02))
* Prompt for name if not provided ([4b1c473](https://github.com/aerotoad/xeito/commit/4b1c473e4c442a12dd60c3ea0705a00ad936f981))
* **prop:** Cleanup prop code and avoid unnecessary updates ([fe58917](https://github.com/aerotoad/xeito/commit/fe58917f2f6f2ce438b730c129bdb0ec8d2faabd))
* **prop:** Update decorator to use new internal variable setters ([bb5c1b6](https://github.com/aerotoad/xeito/commit/bb5c1b662cc3c45086957c16497c714fb4358cb9))
* Redo the injection package to not use reflect-metadata ([94931c0](https://github.com/aerotoad/xeito/commit/94931c08152365890fa9b20f23bab5dca0d750f6))
* **refs:** Add support for refs ([0d92f4f](https://github.com/aerotoad/xeito/commit/0d92f4f442df33e4bf6ac458e123c347a1eb282f))
* **router:** Rewrite entire router with new architecture ([1a72539](https://github.com/aerotoad/xeito/commit/1a72539bf58bd6e2cf36dcd7d45e6fd7500c0bcb))
* Show error if running g in a non-xeito folder ([c902f94](https://github.com/aerotoad/xeito/commit/c902f9433210b6bfeab63ff3057745c1ebfaf087))
* **slotContent:** Handle text and comments nodes in slotContent ([2befa63](https://github.com/aerotoad/xeito/commit/2befa632fedc63e55fe0d344a11a0c55dba25e36))
* **slots:** Add support for slotted content without shadowDOM  ([eee846c](https://github.com/aerotoad/xeito/commit/eee846c4f46e69c55554812c1d0803336a0dc9dc))
* **state:** Use different refresh approach and better proxy ([6ba69d6](https://github.com/aerotoad/xeito/commit/6ba69d6ff054ba191f433471ca026ec5bb6e34ea))
* Track component instances to prevent reloads if not unmounted ([26f543f](https://github.com/aerotoad/xeito/commit/26f543f59c3e08980a9e3a103602f32c0ddae063))
* Update examples ([1f5af70](https://github.com/aerotoad/xeito/commit/1f5af700f90a91871562871aee267afaa49c82b1))
* Update examples ([2bde184](https://github.com/aerotoad/xeito/commit/2bde184762f050f6f508cd8243dd470194539e1f))
* Update examples ([aa2a64a](https://github.com/aerotoad/xeito/commit/aa2a64ad51d35d80d55433de83a90d143acba88f))
* Update examples ([7530845](https://github.com/aerotoad/xeito/commit/75308452f5ae6a0efa17f1f82691253368ba3a93))
* Use .xeitorc to generate files ([3d94594](https://github.com/aerotoad/xeito/commit/3d94594ab3ef4310a27dae16652cab38f2cbb279))
* Use new lifecycle events ([2a7b5ab](https://github.com/aerotoad/xeito/commit/2a7b5abaed68d4e2536315387ef8cd1649a89196))
* Use XeitoInternals interface and add space for imported services ([f0410b6](https://github.com/aerotoad/xeito/commit/f0410b64dc3f1adb2108f379f77e6cfebd8f3193))


### Bug Fixes

* Add missing export event ([45bf216](https://github.com/aerotoad/xeito/commit/45bf216d43e6249bc55e98bae7418eabbcb20f88))
* **emitter:** Export emitter as type ([e86272c](https://github.com/aerotoad/xeito/commit/e86272cf873e57ea5a60dab1c764edc399291214))
* Import reflect-metadata clean old imports ([b47e69c](https://github.com/aerotoad/xeito/commit/b47e69c55a223d58cb989469981742cb0edbbc63))
* Missing dependency ([3450c58](https://github.com/aerotoad/xeito/commit/3450c58ed473519ae822422e767c9ea637ec04b1))
* **plugin:** Wrong file name ([f9aba63](https://github.com/aerotoad/xeito/commit/f9aba63bec93f9aa3112669c22811bfe488c26bc))
* Props react only to binded properties ([607fc5c](https://github.com/aerotoad/xeito/commit/607fc5c4b2a0a2f316a4a19577577cea17062eb9))
* **ref:** Missing ref export ([a7a02b4](https://github.com/aerotoad/xeito/commit/a7a02b4ee64df5ca5f6268b58d482d462f974964))
* **routing:** Default redirects not loading child router views ([a158af5](https://github.com/aerotoad/xeito/commit/a158af544d65e896c6c047be50cb75e488ef585a))
* **slot:** Fix runtime errors when children are null ([b246f7f](https://github.com/aerotoad/xeito/commit/b246f7f436340b08029accf83d741a46111724db))
* **state:** Store state values in class object to prevent collisions ([4082458](https://github.com/aerotoad/xeito/commit/40824582227bb860b89713a6cca47c5e3e6ecbce))
* Update exports ([6f2597a](https://github.com/aerotoad/xeito/commit/6f2597a40863d13a944620e27a5aaaa82e2f8b51))
* Update exports ([f6aa4b9](https://github.com/aerotoad/xeito/commit/f6aa4b92899e138084fcffe4265e82a84e5f62df))
* Wrong hook call ([6e3d567](https://github.com/aerotoad/xeito/commit/6e3d56723830ae650ca66486c689482d0adc2e4f))
* Wrong property for children global assign ([597e53a](https://github.com/aerotoad/xeito/commit/597e53ab279689d8b9320e36ccfa506b51622063))
