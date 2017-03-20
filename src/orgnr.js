angular.module('inputTypes')

.directive('inputOrgnr', function($browser, validate) {
    function format(value) {
        var century = value.slice(0, 2);
        var containsCentury = century == 16 || century == 18 || century == 19 || century == 20;

        if((value.length == 6 && !containsCentury) || (value.length == 8 && containsCentury)) {
            if(value.indexOf('-') == -1) {
                value += '-';
            }
        }

        if((value.length == 10 && !containsCentury) || (value.length == 12 && containsCentury)) {
            var newValue = value.slice(0, value.length - 4) + '-' + value.slice(value.length - 4);
            if(validate.orgnr(newValue)) {
                value = newValue;
            }
        }

        return value;
    }

    function formatPaste(value) {
        if(value.length < 2) {
            return value;
        }

        var century = value.slice(0, 2);
        var containsCentury = century == 16 || century == 18 || century == 19 || century == 20;

        if((value.length == 10 && !containsCentury) || (value.length == 12 && containsCentury)) {
            if(value.indexOf('-') == -1) {
                value = value.slice(0, value.length - 4) + '-' + value.slice(value.length - 4);
            }
        }

        return value;
    }

    return {
        restrict: 'A',
        require: 'ngModel',
        link: function(scope, elm, attrs, ctrl) {
            ctrl.$validators.orgnr = function(modelValue, viewValue) {
                return ctrl.$isEmpty(modelValue) || validate.orgnr(viewValue);
            }

            var listener = function() {
                var value = elm.val().replace(/[^0-9\-]/g, '').replace('--', '-');
                value = format(value);
                if(value != elm.val()) {
                    elm.val(value);
                    elm.triggerHandler('input');
                }
            }

            var pasteListener = function() {
                var value = elm.val().replace(/[^0-9\-]/g, '').replace('--', '-');
                value = formatPaste(value);
                if(value != elm.val()) {
                    elm.val(value);
                    elm.triggerHandler('input');
                }
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

            elm.bind('change', listener);
        }
    }
});
