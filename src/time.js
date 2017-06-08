angular.module('inputTypes')

.directive('inputTime', ['$browser', '$parse', 'validate', function($browser, $parse, validate) {
    function format(value) {
        if(value.length > 5) {
            return value.substring(0, 5);
        }

        if(value.charAt(value.length - 1) == ':') {
            while(value.length < 3) {
                value = '0' + value;
            }
        }

        if(value.length == 2) {
            return value + ':';
        }

        if(value.length > 4 && value.charAt(4) == ':') {
            return value.substring(0, 4);
        }

        return value;
    }

    function formatPaste(value) {
        value == value.match(/\d{1,2}:\d{2}/g)[0];
        if(value.length == 5) {
            return value;
        }

        if(value.length == 4) {
            return '0' + value;
        }

        return '';
    }

    function setViewValue(inputElement, value) {
        inputElement.val(value === null ? '' : value);
        inputElement.triggerHandler('input');
    }

    function filterInput(value) {
        return value.replace(/[^0-9\:]/g, '').replace('::', ':');
    }

    function addLeadingZeroIfLessThen10(value) {
        return ('0' + value).slice(-2);
    }

    return {
        restrict: 'A',
        require: 'ngModel',
        link: function(scope, elm, attrs, ctrl) {
            ctrl.$validators.time = function(modelValue, viewValue) {
                return ctrl.$isEmpty(modelValue) || validate.time(viewValue);
            }

            var listener = function() {
                if(elm.val()) {
                    setViewValue(elm, format(filterInput(elm.val())));
                }
            }

            var pasteListener = function() {
                setViewValue(elm, formatPaste(filterInput(elm.val())));
            }

            elm.bind('keydown', function(event) {
                var key = event.keyCode;
                // Backspace, delete, ctrl, shift, alt or meta keys
                if(key == 8 || key == 46 || key == 91 || (15 < key && key < 19) || (37 <= key && key <= 40)) {
                    return;
                }
                $browser.defer(listener);
            });

            elm.bind('paste cut', function() {
                $browser.defer(pasteListener);
            });

            elm.bind('change', pasteListener);

            if (attrs.ngModel) {
                var modelValue = $parse(attrs.ngModel)(scope);
                if(modelValue) {
                    setViewValue(elm, addLeadingZeroIfLessThen10(modelValue.getHours()) + ':' + addLeadingZeroIfLessThen10(modelValue.getMinutes()));
                    elm.triggerHandler('change'); // Make IE update viewValue
                }
            }
        }
    }
}]);
