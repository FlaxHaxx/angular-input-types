# Angular Input Types
Creates form inputs for swedish SSN (i.e. personnummer). There will be more input types in the future.

# Demo
There is a demo at https://www.blitter.se/angular-input-types/examples/

# Installation
Download [angular-input-types.min.js](dist/angular-input-types.min.js).

# Usage
## Personnummer
Helps the user to enter a swedish SSN in the format of yyyymmdd-nnnn.
```html
<input type="tel" id="personnummer" ng-model="personnummer" input-personnummer/>
```

## Organisationsnummer
Helps the user to enter an swedish organisation number.
```html
<input type="tel" id="orgnr" ng-model="orgnr" input-orgnr/>
```
