angular.module('inputTypes')

.provider('inputNumber', function() {
    this.nrOfDecimals = 0;

    this.$get = function() {
        return this;
    }
})

.directive('inputNumber', ['$browser', '$filter', '$locale', '$parse', 'inputNumber', 'inputUtils', 'validate',
        function($browser, $filter, $locale, $parse, inputNumber, inputUtils, validate) {
    var thousandSeparator = $locale.NUMBER_FORMATS.GROUP_SEP;
    var decimalSeparator = $locale.NUMBER_FORMATS.DECIMAL_SEP;
    var nrOfDecimals = inputNumber.nrOfDecimals;
    var previousValueLength = 0;

    function plainNumber(value) {
        if(value === null) {
            return null;
        }

        var plainNumber = ('' + value).replace('.', decimalSeparator).replace(new RegExp('[^\\d|\\-+|\\' + decimalSeparator + '+]', 'g'), '');

        var regExp = '^\\d+';
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

            if(plainNumberLength > 3 && plainNumberLength % 3 == 1) {
                cursorPosition++;
            }

            if(previousValueLength > plainNumberLength && previousValueLength > 3 && previousValueLength % 3 > 0 && cursorPosition > 0) {
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

    return {
        restrict: 'A',
        require: 'ngModel',
        link: function(scope, elm, attrs, ctrl) {
            ctrl.$parsers.unshift(function(viewValue) {
                if(!viewValue) {
                    return null;
                }
                var modelValue = plainNumber(viewValue);
                setViewValue(elm, modelValue, scope);
                return modelValue === null ? null : modelValue.replace(decimalSeparator, '.').replace(/\.$/, '');
            });

            if (attrs.ngModel) {
                var modelValue = $parse(attrs.ngModel)(scope);
                if(modelValue) {
                    setViewValue(elm, plainNumber(modelValue), scope);
                    elm.triggerHandler('change'); // Update viewValue
                }
            }
        }
    }
}]);
