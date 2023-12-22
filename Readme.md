# Canaille

## Overview

Canaille is a design system created by Bdx.town for building our user interfaces. The system is composed of three libraries that work together to provide a seamless experience for developers and designers.

The first library is a SASS library that provides a comprehensive set of utility CSS classes. These classes can be used to quickly and easily style any element on a page. The classes are designed to be modular, so developers can mix and match them as needed to achieve their desired look and feel.

The second library is a React library that provides a collection of reusable UI components. These components are built using the design tokens from the SASS library, making it easy to create consistent and visually appealing interfaces. The React library includes everything from basic layout components to more complex interactive components like modals and dropdown menus.

The third library is a SVG library that exports a JavaScript bundle for icons. These icons can be easily included in any project that uses Canaille, and are designed to be flexible and scalable to fit any design.

Canaille (v3+) uses CSS layers to avoid messing with user's code. Utilities classes will take over components style, and other css code will win everything.


## Technical stack

- node
- javascript
- typescript
- sass

## Requirements

- Node version 14+
- NPM

## Code style

Please check `.eslintrc` file

## Third-party libraries

Please check `package.json` for a comprehensive list of canaille dependencies.

`react` and `react-dom`, `react-router-dom`, `jss` and `react-jss` are exposed as externals of this project. Projects using Canaille must provide compatible versions.

## Getting started

1. `make clean`
2. `make install`
3. `make dev`

### Build project

1. `make clean`
2. `make install`
3. `make build`

Please note you can also use `make dev` instead of `make build` to start a build-on-change process

### Linked

If you want to locally build and test Canaille, you may need to use it in linked mode.
To do so, please run `make prepare` before running `make build` or `make dev`

1. `make clean`
2. `make prepare`
3. `make build` or `make dev`

Now you can link canaille in your other projects with:  
`npx yarn link canaille`

## Good to know

### How tu use Canaille in your project

Integrating Canaille (3+) into your project is a straightforward process. Canaille comes in two versions, namely "platform" and "goodmed," each consisting of a CSS file and two JavaScript files (one for components and one for icons). This documentation will guide you through the integration process step by step.

#### 1. Import the CSS file

To include the CSS file in your project, use the following import statement:

```javascript
import 'canaille/index.css';
```

#### 2. Import the Component JavaScript file

To use Canaille components, import the necessary JavaScript file, including the components you need:

```javascript
import { Article, Button, Icon } from 'canaille';
```

#### 3. Import the Icons JavaScript file

If you require icons from Canaille, you can import them as follows:

```javascript
import { icnArrowLineRight } from 'canaille/icons';
```

For usage examples of these icons, refer to the "Icon / Icon" section.

#### 4. Translation System

Canaille also includes a built-in translation system to simplify localization efforts. For detailed information on using the translation system, please refer to the "Helpers / Translation System" section.

That's it! You have successfully integrated Canaille into your project. You can now start utilizing its components, icons, and translation capabilities to enhance your application's user interface and functionality.
Each javascript file exposes its own typescript type definitions, so your favorite IDE should be able to help you with imports and calls !

## Versioning

Please refer to this [documentation](https://www.notion.so/D-ploiements-MET-MEP-e92419eb987845a299f6b91d0f61d9ff#e54f3dc8e9874819b4d378f8fcc1e079) to know how to build version numbers.

## Deployment

1. Please ensure `package.json` expose a correct version number
2. run `make publish`

## Testing

The `make test` command allows you to run the various tests included in canaille's basecode.

All components must be test. A git hook will prevent pushing if any test fails. Please before starting to code a new canaille component, begin by writing its tests.

Please follow Best Practices described [here](https://blog.sapegin.me/all/react-testing-1-best-practices/) to write your tests.

## Troubleshooting

### "undefined" in the html render

If you have a className who is `undefined` on one component, you can create an issue on material and signal it to the the team in charge of CANAILLE.