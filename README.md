# Angular Input Types
[![npm version](https://img.shields.io/npm/v/angular-input-types.svg?style=flat-square)](https://www.npmjs.com/package/angular-input-types)
[![Build Status](https://travis-ci.org/FlaxHaxx/angular-input-types.svg)](https://travis-ci.org/FlaxHaxx/angular-input-types)
[![Dependency Status](https://img.shields.io/david/flaxhaxx/angular-input-types.svg?style=flat-square)](https://david-dm.org/flaxhaxx/angular-input-types)
[![peerDependency Status](https://img.shields.io/david/peer/flaxhaxx/angular-input-types.svg?style=flat-square)](https://david-dm.org/flaxhaxx/angular-input-types?type=peer)
[![devDependency Status](https://img.shields.io/david/dev/flaxhaxx/angular-input-types.svg?style=flat-square)](https://david-dm.org/flaxhaxx/angular-input-types?type=dev)

Angular Input Types is used to create form inputs which help users enter the correct format using autocomplete and validation. See available input types below.
- [Swedish SSN (i.e. personnummer)](#swedish-ssn-ie-personnummer)
- [Swedish organization number](#swedish-organization-number)
- [Number (Beta)](#number-beta)
- [Time](#time)

# Demo
There is a demo at https://www.blitter.se/angular-input-types/examples/

# Installation
Several options are available:
- [Download latest version](https://github.com/FlaxHaxx/angular-input-types/releases/latest).
- Install with [npm](https://www.npmjs.com): `npm install angular-input-types`
- Install with [yarn](https://github.com/yarnpkg/yarn): `yarn add angular-input-types`


# Usage
Include angular-input-types.min.js on the page.
```html
<script src="angular-input-types.min.js"></script>
```

Include the `inputTypes` dependency in on your AngularJS module.
```html
var app = angular.module('exampleApp', [ 'inputTypes' ]);
```

See how to use different input types below.

## Swedish SSN (i.e. personnummer)
Helps the user to enter a swedish SSN in the format of yyyymmdd-nnnn.

The input must have an `ng-model` for the validation to work.
```html
<input type="tel" id="personnummer" ng-model="personnummer" input-personnummer/>
```

## Swedish organization number
Helps the user to enter an swedish organization number in the format of nnnnnn-nnnn or nnnnnnnn-nnnn. Also allows Swedish SSN as that could be an organization number.

The input must have an `ng-model` for the validation to work.
```html
<input type="tel" id="orgnr" ng-model="orgnr" input-orgnr/>
```

## Number
Helps the user to enter a number by adding thousand separators and restricting number of decimals.

The input must have an `ng-model` for the validation to work. The type has to be `tel` to work in Firefox on Android.
```html
<input type="tel" id="number" ng-model="number" input-number/>
```

Change number of decimals like this. Default is no decimals.
```javascript
angular.module('myApp').config(['inputNumberProvider', function(inputNumberProvider) {
    inputNumberProvider.nrOfDecimals = 2;
}]);
```

The thousand separator and decimal separators are based on which language the browser is using. You can override these like this.
```javascript
angular.module('myApp').run(['$locale', function($locale) {
  $locale.NUMBER_FORMATS.GROUP_SEP = ' '; // Use space as thousand separtor
  $locale.NUMBER_FORMATS.DECIMAL_SEP = ','; // Use comma as decimal separator
}])
```

## Time
Helps the user to enter a time using native time input on mobile devices by setting `type="time"` on the input element. The `input-time` attribute adds validation plus autocomplete as fallback.

The input must have an `ng-model` for the validation to work.
```html
<input type="time" id="time" ng-model="time" input-time/>
```

![input-time on Android](https://github.com/FlaxHaxx/angular-input-types/raw/master/examples/gallery/input-time-android.png)
