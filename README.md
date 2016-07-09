[<img src="https://cloud.githubusercontent.com/assets/29597/11737732/0ca1e55e-9f91-11e5-97f3-098f2f8ed866.png" alt="React virtualized" data-canonical-src="https://cloud.githubusercontent.com/assets/29597/11737732/0ca1e55e-9f91-11e5-97f3-098f2f8ed866.png" width="330" height="100" />](http://bvaughn.github.io/react-virtualized/)

![NPM version](https://img.shields.io/npm/v/react-virtualized.svg?style=flat)
![NPM license](https://img.shields.io/npm/l/react-virtualized.svg?style=flat)
![NPM total downloads](https://img.shields.io/npm/dt/react-virtualized.svg?style=flat)
![NPM monthly downloads](https://img.shields.io/npm/dm/react-virtualized.svg?style=flat)
[![Circle CI badge](https://img.shields.io/circleci/project/bvaughn/react-virtualized/master.svg?style=flat)](https://circleci.com/gh/bvaughn/react-virtualized)
[![Codecov badge](https://img.shields.io/codecov/c/github/bvaughn/react-virtualized/master.svg)](https://codecov.io/github/bvaughn/react-virtualized)
[![Gitter](https://badges.gitter.im/bvaughn/react-virtualized.svg)](https://gitter.im/bvaughn/react-virtualized?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
[![OpenCollective](https://opencollective.com/react-virtualized/backers/badge.svg)](#backers)
[![OpenCollective](https://opencollective.com/react-virtualized/sponsors/badge.svg)](#sponsors)

Interested in sponsoring react-virtualized development? [Learn more](#open-collective).

Getting started
---------------

Install `react-virtualized` using npm.

```shell
npm install react-virtualized --save
```

ES6, CommonJS, and UMD builds are available with each distribution.
For example:

```js
// Make sure to import default styles.
// This only needs to be done once; probably during your application's bootstrapping process.
import 'react-virtualized/styles.css';

// Then you can import any react-virtualized components you need.
// Tree-shaking is supported with ES6 or CommonJS usage.
import { Grid } from 'react-virtualized'
```

Alternately you can load a global-friendly UMD build:

```html
<link rel="stylesheet" href="path-to-react-virtualized/styles.css">
<script src="path-to-react-virtualized/dist/umd/react-virtualized.js"></script>
```

Dependencies
---------------

React Virtualized has very few dependencies and most are managed by NPM automatically.
However the following peer dependencies must be specified by your project in order to avoid version conflicts:
[`react`](https://www.npmjs.com/package/react),
[`react-addons-shallow-compare`](https://www.npmjs.com/package/react-addons-shallow-compare), and
[`react-dom`](https://www.npmjs.com/package/react-dom).
NPM will not automatically install these for you but it will show you a warning message with instructions on how to install them.

Pure Components
---------------

By default all react-virtualized components use [`shallowCompare`](https://facebook.github.io/react/docs/shallow-compare.html) to avoid re-rendering unless props or state has changed.
This ocassionally confuses users when a collection's data changes (eg `['a','b','c']` => `['d','e','f']`) but props do not (eg `array.length`).

The solution to this is to let react-virtualized know that something external has changed.
This can be done a couple of different ways.

###### Pass-thru props

The `shallowCompare` method will detect changes to any props, even if they aren't declared as `propTypes`.
This means you can also pass through additional properties that affect cell rendering to ensure changes are detected.
For example, if you're using `VirtualScroll` to render a list of items that may be re-sorted after initial render- react-virtualized would not normally detect the sort operation because none of the properties it deals with change.
However you can pass through the additional sort property to trigger a re-render.
For example:

```js
<VirtualScroll
  {...virtualScrollProps}
  sortBy={sortBy}
/>
```

###### Public methods

`Grid` and `Collection` components can be forcefully re-rendered using [`forceUpdate`](https://facebook.github.io/react/docs/component-api.html#forceupdate).
For `FlexTable` and `VirtualScroll`, you'll need to call [`forceUpdateGrid`](https://github.com/bvaughn/react-virtualized/blob/master/docs/FlexTable.md#forceupdategrid)) to ensure that the inner `Grid` is also updated.

Documentation
---------------

API documentation available [here](docs/README.md).

There are also a couple of how-to guides:
* [Customizing classes and styles](docs/customizingStyles.md)
* [Displaying items in reverse order](docs/reverseList.md)
* [Using AutoSizer](docs/usingAutoSizer.md)
* [Creating an infinite-loading list](docs/creatingAnInfiniteLoadingList.md)
* [Displaying a reverse list](docs/reverseList.md)

Examples
---------------

Examples for each component can be seen in [the documentation](docs/README.md).

Here are some online demos of each component:

* [ArrowKeyStepper](https://bvaughn.github.io/react-virtualized/?component=ArrowKeyStepper)
* [AutoSizer](https://bvaughn.github.io/react-virtualized/?component=AutoSizer)
* [CellMeasurer](https://bvaughn.github.io/react-virtualized/?component=CellMeasurer)
* [Collection](https://bvaughn.github.io/react-virtualized/?component=Collection)
* [ColumnSizer](https://bvaughn.github.io/react-virtualized/?component=ColumnSizer)
* [FlexTable](https://bvaughn.github.io/react-virtualized/?component=FlexTable)
* [Grid](https://bvaughn.github.io/react-virtualized/?component=Grid)
* [InfiniteLoader](https://bvaughn.github.io/react-virtualized/?component=InfiniteLoader)
* [ScrollSync](https://bvaughn.github.io/react-virtualized/?component=ScrollSync)
* [VirtualScroll](https://bvaughn.github.io/react-virtualized/?component=VirtualScroll)
* [WindowScroller](https://bvaughn.github.io/react-virtualized/?component=WindowScroller)

And here are some "recipe" type demos:
* [Collapsable tree view](https://rawgit.com/bvaughn/react-virtualized/master/playground/tree.html)
* [Full-page grid (spreadsheet)](https://rawgit.com/bvaughn/react-virtualized/master/playground/grid.html)
* [Dynamic cell measuring](https://rawgit.com/bvaughn/react-virtualized/master/playground/chat.html)
* [Cell hover effects](https://rawgit.com/bvaughn/react-virtualized/master/playground/hover.html)

Supported Browsers
---------------
react-virtualized aims to support all evergreen browsers and recent mobile browsers for iOS and Android. IE 9+ is also supported (although IE 9 will require some user-defined, custom CSS since flexbox layout is not supported).

If you find a browser-specific problem, please report it along with a repro case. The easiest way to do this is probably by forking [this Plunker](https://plnkr.co/edit/6syKo8cx3RfoO96hXFT1).

Friends
---------------
Here are some great components built on top of react-virtualized:
* [react-infinite-calendar](https://github.com/clauderic/react-infinite-calendar): Infinite scrolling date-picker with localization, themes, keyboard support, and more
* [react-sortable-hoc](https://github.com/clauderic/react-sortable-hoc): Higher-order components to turn any list into an animated, touch-friendly, sortable list
* [react-virtualized-checkbox](https://github.com/emilebres/react-virtualized-checkbox): Checkbox group component with virtualization for large number of options
* [react-virtualized-select](https://github.com/bvaughn/react-virtualized-select): Drop-down menu for React with windowing to support large numbers of options.

Open Collective
---------------

##### Backers
Support us with a monthly donation and help us continue our activities. [[Become a backer](https://opencollective.com/react-virtualized#backer)]

<a href="https://opencollective.com/react-virtualized/backer/0/website" target="_blank"><img src="https://opencollective.com/react-virtualized/backer/0/avatar.svg"></a>
<a href="https://opencollective.com/react-virtualized/backer/1/website" target="_blank"><img src="https://opencollective.com/react-virtualized/backer/1/avatar.svg"></a>
<a href="https://opencollective.com/react-virtualized/backer/2/website" target="_blank"><img src="https://opencollective.com/react-virtualized/backer/2/avatar.svg"></a>
<a href="https://opencollective.com/react-virtualized/backer/3/website" target="_blank"><img src="https://opencollective.com/react-virtualized/backer/3/avatar.svg"></a>
<a href="https://opencollective.com/react-virtualized/backer/4/website" target="_blank"><img src="https://opencollective.com/react-virtualized/backer/4/avatar.svg"></a>
<a href="https://opencollective.com/react-virtualized/backer/5/website" target="_blank"><img src="https://opencollective.com/react-virtualized/backer/5/avatar.svg"></a>
<a href="https://opencollective.com/react-virtualized/backer/6/website" target="_blank"><img src="https://opencollective.com/react-virtualized/backer/6/avatar.svg"></a>
<a href="https://opencollective.com/react-virtualized/backer/7/website" target="_blank"><img src="https://opencollective.com/react-virtualized/backer/7/avatar.svg"></a>
<a href="https://opencollective.com/react-virtualized/backer/8/website" target="_blank"><img src="https://opencollective.com/react-virtualized/backer/8/avatar.svg"></a>
<a href="https://opencollective.com/react-virtualized/backer/9/website" target="_blank"><img src="https://opencollective.com/react-virtualized/backer/9/avatar.svg"></a>
<a href="https://opencollective.com/react-virtualized/backer/10/website" target="_blank"><img src="https://opencollective.com/react-virtualized/backer/10/avatar.svg"></a>
<a href="https://opencollective.com/react-virtualized/backer/11/website" target="_blank"><img src="https://opencollective.com/react-virtualized/backer/11/avatar.svg"></a>
<a href="https://opencollective.com/react-virtualized/backer/12/website" target="_blank"><img src="https://opencollective.com/react-virtualized/backer/12/avatar.svg"></a>
<a href="https://opencollective.com/react-virtualized/backer/13/website" target="_blank"><img src="https://opencollective.com/react-virtualized/backer/13/avatar.svg"></a>
<a href="https://opencollective.com/react-virtualized/backer/14/website" target="_blank"><img src="https://opencollective.com/react-virtualized/backer/14/avatar.svg"></a>
<a href="https://opencollective.com/react-virtualized/backer/15/website" target="_blank"><img src="https://opencollective.com/react-virtualized/backer/15/avatar.svg"></a>
<a href="https://opencollective.com/react-virtualized/backer/16/website" target="_blank"><img src="https://opencollective.com/react-virtualized/backer/16/avatar.svg"></a>
<a href="https://opencollective.com/react-virtualized/backer/17/website" target="_blank"><img src="https://opencollective.com/react-virtualized/backer/17/avatar.svg"></a>
<a href="https://opencollective.com/react-virtualized/backer/18/website" target="_blank"><img src="https://opencollective.com/react-virtualized/backer/18/avatar.svg"></a>
<a href="https://opencollective.com/react-virtualized/backer/19/website" target="_blank"><img src="https://opencollective.com/react-virtualized/backer/19/avatar.svg"></a>
<a href="https://opencollective.com/react-virtualized/backer/20/website" target="_blank"><img src="https://opencollective.com/react-virtualized/backer/20/avatar.svg"></a>
<a href="https://opencollective.com/react-virtualized/backer/21/website" target="_blank"><img src="https://opencollective.com/react-virtualized/backer/21/avatar.svg"></a>
<a href="https://opencollective.com/react-virtualized/backer/22/website" target="_blank"><img src="https://opencollective.com/react-virtualized/backer/22/avatar.svg"></a>
<a href="https://opencollective.com/react-virtualized/backer/23/website" target="_blank"><img src="https://opencollective.com/react-virtualized/backer/23/avatar.svg"></a>
<a href="https://opencollective.com/react-virtualized/backer/24/website" target="_blank"><img src="https://opencollective.com/react-virtualized/backer/24/avatar.svg"></a>
<a href="https://opencollective.com/react-virtualized/backer/25/website" target="_blank"><img src="https://opencollective.com/react-virtualized/backer/25/avatar.svg"></a>
<a href="https://opencollective.com/react-virtualized/backer/26/website" target="_blank"><img src="https://opencollective.com/react-virtualized/backer/26/avatar.svg"></a>
<a href="https://opencollective.com/react-virtualized/backer/27/website" target="_blank"><img src="https://opencollective.com/react-virtualized/backer/27/avatar.svg"></a>
<a href="https://opencollective.com/react-virtualized/backer/28/website" target="_blank"><img src="https://opencollective.com/react-virtualized/backer/28/avatar.svg"></a>
<a href="https://opencollective.com/react-virtualized/backer/29/website" target="_blank"><img src="https://opencollective.com/react-virtualized/backer/29/avatar.svg"></a>

##### Sponsors
Become a sponsor and get your logo on our README on Github with a link to your site. [[Become a sponsor](https://opencollective.com/react-virtualized#sponsor)]

<a href="https://opencollective.com/react-virtualized/sponsor/0/website" target="_blank"><img src="https://opencollective.com/react-virtualized/sponsor/0/avatar.svg"></a>
<a href="https://opencollective.com/react-virtualized/sponsor/1/website" target="_blank"><img src="https://opencollective.com/react-virtualized/sponsor/1/avatar.svg"></a>
<a href="https://opencollective.com/react-virtualized/sponsor/2/website" target="_blank"><img src="https://opencollective.com/react-virtualized/sponsor/2/avatar.svg"></a>
<a href="https://opencollective.com/react-virtualized/sponsor/3/website" target="_blank"><img src="https://opencollective.com/react-virtualized/sponsor/3/avatar.svg"></a>
<a href="https://opencollective.com/react-virtualized/sponsor/4/website" target="_blank"><img src="https://opencollective.com/react-virtualized/sponsor/4/avatar.svg"></a>
<a href="https://opencollective.com/react-virtualized/sponsor/5/website" target="_blank"><img src="https://opencollective.com/react-virtualized/sponsor/5/avatar.svg"></a>
<a href="https://opencollective.com/react-virtualized/sponsor/6/website" target="_blank"><img src="https://opencollective.com/react-virtualized/sponsor/6/avatar.svg"></a>
<a href="https://opencollective.com/react-virtualized/sponsor/7/website" target="_blank"><img src="https://opencollective.com/react-virtualized/sponsor/7/avatar.svg"></a>
<a href="https://opencollective.com/react-virtualized/sponsor/8/website" target="_blank"><img src="https://opencollective.com/react-virtualized/sponsor/8/avatar.svg"></a>
<a href="https://opencollective.com/react-virtualized/sponsor/9/website" target="_blank"><img src="https://opencollective.com/react-virtualized/sponsor/9/avatar.svg"></a>
<a href="https://opencollective.com/react-virtualized/sponsor/10/website" target="_blank"><img src="https://opencollective.com/react-virtualized/sponsor/10/avatar.svg"></a>
<a href="https://opencollective.com/react-virtualized/sponsor/11/website" target="_blank"><img src="https://opencollective.com/react-virtualized/sponsor/11/avatar.svg"></a>
<a href="https://opencollective.com/react-virtualized/sponsor/12/website" target="_blank"><img src="https://opencollective.com/react-virtualized/sponsor/12/avatar.svg"></a>
<a href="https://opencollective.com/react-virtualized/sponsor/13/website" target="_blank"><img src="https://opencollective.com/react-virtualized/sponsor/13/avatar.svg"></a>
<a href="https://opencollective.com/react-virtualized/sponsor/14/website" target="_blank"><img src="https://opencollective.com/react-virtualized/sponsor/14/avatar.svg"></a>
<a href="https://opencollective.com/react-virtualized/sponsor/15/website" target="_blank"><img src="https://opencollective.com/react-virtualized/sponsor/15/avatar.svg"></a>
<a href="https://opencollective.com/react-virtualized/sponsor/16/website" target="_blank"><img src="https://opencollective.com/react-virtualized/sponsor/16/avatar.svg"></a>
<a href="https://opencollective.com/react-virtualized/sponsor/17/website" target="_blank"><img src="https://opencollective.com/react-virtualized/sponsor/17/avatar.svg"></a>
<a href="https://opencollective.com/react-virtualized/sponsor/18/website" target="_blank"><img src="https://opencollective.com/react-virtualized/sponsor/18/avatar.svg"></a>
<a href="https://opencollective.com/react-virtualized/sponsor/19/website" target="_blank"><img src="https://opencollective.com/react-virtualized/sponsor/19/avatar.svg"></a>
<a href="https://opencollective.com/react-virtualized/sponsor/20/website" target="_blank"><img src="https://opencollective.com/react-virtualized/sponsor/20/avatar.svg"></a>
<a href="https://opencollective.com/react-virtualized/sponsor/21/website" target="_blank"><img src="https://opencollective.com/react-virtualized/sponsor/21/avatar.svg"></a>
<a href="https://opencollective.com/react-virtualized/sponsor/22/website" target="_blank"><img src="https://opencollective.com/react-virtualized/sponsor/22/avatar.svg"></a>
<a href="https://opencollective.com/react-virtualized/sponsor/23/website" target="_blank"><img src="https://opencollective.com/react-virtualized/sponsor/23/avatar.svg"></a>
<a href="https://opencollective.com/react-virtualized/sponsor/24/website" target="_blank"><img src="https://opencollective.com/react-virtualized/sponsor/24/avatar.svg"></a>
<a href="https://opencollective.com/react-virtualized/sponsor/25/website" target="_blank"><img src="https://opencollective.com/react-virtualized/sponsor/25/avatar.svg"></a>
<a href="https://opencollective.com/react-virtualized/sponsor/26/website" target="_blank"><img src="https://opencollective.com/react-virtualized/sponsor/26/avatar.svg"></a>
<a href="https://opencollective.com/react-virtualized/sponsor/27/website" target="_blank"><img src="https://opencollective.com/react-virtualized/sponsor/27/avatar.svg"></a>
<a href="https://opencollective.com/react-virtualized/sponsor/28/website" target="_blank"><img src="https://opencollective.com/react-virtualized/sponsor/28/avatar.svg"></a>
<a href="https://opencollective.com/react-virtualized/sponsor/29/website" target="_blank"><img src="https://opencollective.com/react-virtualized/sponsor/29/avatar.svg"></a>

Contributions
------------

Use [GitHub issues](https://github.com/bvaughn/react-virtualized/issues) for requests.

I actively welcome pull requests; learn how to [contribute](https://github.com/bvaughn/react-virtualized/blob/master/CONTRIBUTING.md).

Changelog
---------

Changes are tracked in the [changelog](https://github.com/bvaughn/react-virtualized/blob/master/CHANGELOG.md).

License
---------

*react-virtualized* is available under the MIT License.
