# Angular Input Types
[![npm version](https://img.shields.io/npm/v/angular-input-types.svg?style=flat-square)](https://www.npmjs.com/package/angular-input-types)

[![Build Status](https://travis-ci.org/FlaxHaxx/angular-input-types.svg)](https://travis-ci.org/FlaxHaxx/angular-input-types)
[![Dependency Status](https://img.shields.io/david/flaxhaxx/angular-input-types.svg?style=flat-square)](https://david-dm.org/flaxhaxx/angular-input-types)
[![peerDependency Status](https://img.shields.io/david/peer/flaxhaxx/angular-input-types.svg?style=flat-square)](https://david-dm.org/flaxhaxx/angular-input-types?type=peer)
[![devDependency Status](https://img.shields.io/david/dev/flaxhaxx/angular-input-types.svg?style=flat-square)](https://david-dm.org/flaxhaxx/angular-input-types?type=dev)

Angular Input Types is used to create form inputs which help users enter the correct format using autocomplete and validation. See available input types below.
- [Swedish SSN (i.e. personnummer)](#swedish-ssn-ie-personnummer)
- [Swedish organization number](#swedish-organization-number)

# Demo
There is a demo at https://www.blitter.se/angular-input-types/examples/

# Installation
Several options are available:
- [Download latest version](https://github.com/FlaxHaxx/angular-input-types/releases/latest).
- Install with [npm](https://www.npmjs.com): `npm install angular-input-types`
- Install with [yarn](https://github.com/yarnpkg/yarn): `yarn add angular-input-types`


# Usage
## Swedish SSN (i.e. personnummer)
Helps the user to enter a swedish SSN in the format of yyyymmdd-nnnn.
```html
<input type="tel" id="personnummer" ng-model="personnummer" input-personnummer/>
```

## Swedish organization number
Helps the user to enter an swedish organization number.
```html
<input type="tel" id="orgnr" ng-model="orgnr" input-orgnr/>
```
