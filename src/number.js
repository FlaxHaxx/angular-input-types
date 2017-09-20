angular.module('inputTypes')

.provider('inputNumber', function() {
    this.nrOfDecimals = 0;

    this.$get = function() {
        return this;
    }
})

.directive('inputNumber', ['$browser', '$filter', '$locale', '$parse', '$sniffer', 'inputNumber', 'inputUtils', 'validate',
        function($browser, $filter, $locale, $parse, $sniffer, inputNumber, inputUtils, validate) {
    var thousandSeparator = $locale.NUMBER_FORMATS.GROUP_SEP;
    var decimalSeparator = $locale.NUMBER_FORMATS.DECIMAL_SEP;
    var nrOfDecimals = inputNumber.nrOfDecimals;
    var previousValueLength = 0;

    function plainNumber(value) {
        if(value == null) {
            return null;
        }

        var plainNumber = ('' + value).replace('.', decimalSeparator).replace(new RegExp('[^\\d|\\-+|\\' + decimalSeparator + '+]', 'g'), '');

        var regExp = '^\\-?\\d+';
        if(nrOfDecimals > 0) {
            regExp += '(\\' + decimalSeparator + '\\d{0,' + nrOfDecimals + '})?';
        }
        plainNumber = plainNumber.match(new RegExp(regExp, 'g'));

        return plainNumber === null ? null : plainNumber[0];
    }

    function setViewValue(inputElement, plainNumberValue, scope) {
        var cursorPosition = inputUtils.getCursorPos(inputElement[0]);
        inputElement.val(plainNumberValue === null ? '' : format(plainNumberValue));
        if(plainNumberValue !== null) {
            var plainNumberLength = plainNumberValue.toString().split(decimalSeparator)[0].length;
            if(plainNumberLength > 0 && plainNumberValue.charAt(0) == '-') {
                // Remove the minus sign when calculating length for the thousand separators
                plainNumberLength--;
            }

            if(plainNumberLength > 1 && plainNumberLength % 3 == 1 && cursorPosition <= (plainNumberLength + Math.floor(plainNumberLength / 3))) {
                // New thousand separator added
                cursorPosition++;
            }

            if(cursorPosition > 1 && previousValueLength > plainNumberLength && previousValueLength % 3 > 0) {
                // Character deleted and one less decimal separator
                cursorPosition--;
            }

            scope.$evalAsync(inputUtils.setCursorPos(inputElement[0], cursorPosition));
            previousValueLength = plainNumberLength;
        }
    }

    function format(value) {
        var parts = (value + '').split(decimalSeparator);
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, thousandSeparator);
        return parts.join(decimalSeparator);
    }

    function getNrOfDecimals(value, separator) {
        return value.indexOf(separator) == -1 ? 0 : value.split(separator)[1].length;
    }

    return {
        restrict: 'A',
        require: 'ngModel',
        link: function(scope, elm, attrs, ctrl) {
            var attrDecimals = scope.$eval(attrs.decimals);
            if(attrDecimals !== undefined) {
                nrOfDecimals = attrDecimals;
            }

            var attrMin = scope.$eval(attrs.min);

            ctrl.$parsers.unshift(function(viewValue) {
                if(viewValue == '') {
                    return null;
                }

                if(!viewValue) {
                    return undefined;
                }

                var modelValue = plainNumber(viewValue);

                if(modelValue == null || getNrOfDecimals(modelValue, decimalSeparator) > nrOfDecimals) {
                    return undefined;
                }

                setViewValue(elm, modelValue, scope);

                if(getNrOfDecimals(viewValue, decimalSeparator) > nrOfDecimals) {
                    if($sniffer.hasEvent('input')) {
                        elm.triggerHandler('input');
                    } else { // IE 11 Fix
                        elm.triggerHandler('change');
                    }
                }

                ctrl.$validators.min = function(modelValue, viewValue) {
                    return ctrl.$isEmpty(modelValue) || attrMin === undefined || modelValue >= attrMin;
                }

                return modelValue === null ? null : modelValue.replace(decimalSeparator, '.').replace(/\.$/, '');
            });

            if (attrs.ngModel) {
                var modelValue = $parse(attrs.ngModel)(scope);
                if(modelValue) {
                    setViewValue(elm, plainNumber(modelValue), scope);
                }
            }
        }
    }
}]);
