angular.module('inputTypes')

.directive('inputNumber', ['inputUtils', '$browser', '$filter', 'validate', function(inputUtils, $browser, $filter, validate) {
    var thousandSeparator = ' ';
    var decimalSeparator = ',';
    var nrOfDecimals = 2;

    function format(value) {
        return ('' + value).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, function($1) { return $1 + thousandSeparator });
    }

    function plainNumber(value) {
        if(value === null) {
            return null;
        }
        var plainNumber = value.replace(new RegExp('[^\\d|\\-+|\\' + decimalSeparator + '+]', 'g'), '');
        plainNumber = plainNumber.match(new RegExp('^\\d+\\' + decimalSeparator + '?\\d{0,' + nrOfDecimals + '}', 'g'));
        return plainNumber == null ? null : plainNumber[0];
    }

    return {
        restrict: 'A',
        require: 'ngModel',
        link: function(scope, elm, attrs, ctrl) {
            ctrl.$parsers.unshift(function(viewValue) {
                if(!viewValue) {
                    return '';
                }

                var cursorPosition = inputUtils.getCursorPos(elm[0]);
                var modelValue = plainNumber(viewValue);

                if(modelValue === null) {
                    elm.val('');
                    elm.triggerHandler('input');
                    return null;
                }

                elm.val(format(modelValue));
                modelValue = modelValue.replace(decimalSeparator, '.');
                scope.$evalAsync(inputUtils.setCursorPos(elm[0], cursorPosition + (modelValue.toString().length % 3 == 1 ? 1 : 0)));
                return modelValue;
            });
        }
    }
}]);
