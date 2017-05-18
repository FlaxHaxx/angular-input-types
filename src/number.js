angular.module('inputTypes')

.directive('inputNumber', ['inputUtils', '$browser', '$filter', 'validate', function(inputUtils, $browser, $filter, validate) {
    var thousandSeparator = ' ';
    var decimalSeparator = ',';
    var nrOfDecimals = 2;

    function plainNumber(value) {
        if(value === null) {
            return null;
        }

        var plainNumber = value.replace('.', decimalSeparator).replace(new RegExp('[^\\d|\\-+|\\' + decimalSeparator + '+]', 'g'), '');

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
        inputElement.triggerHandler('input');
        if(plainNumberValue !== null) {
            scope.$evalAsync(inputUtils.setCursorPos(inputElement[0], cursorPosition + (plainNumberValue.toString().length % 3 == 1 ? 1 : 0)));
        }
    }

    function format(value) {
        return ('' + value).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, function($1) { return $1 + thousandSeparator });
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
        }
    }
}]);
