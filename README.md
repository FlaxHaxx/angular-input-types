# Angular Input Types
Used on form inputs to help users using autocomplete and validation. See available input types below.
- [Swedish SSN (i.e. personnummer)](#personnummer)
- [Swedish organization number](#organizationsnummer)

# Demo
There is a demo at https://www.blitter.se/angular-input-types/examples/

# Installation
Download [angular-input-types.min.js](dist/angular-input-types.min.js).

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
