angular.module('inputTypes')

.directive('inputPersonnummer', ['$browser', '$sniffer', 'validate', function($browser, $sniffer, validate) {
    var centuryNow = String(new Date().getFullYear()).slice(0, 2);
    var yearNow = String(new Date().getFullYear()).slice(2, 4);

    function format(value) {
        if(value.length == 2 && value != centuryNow - 1 && value != centuryNow) {
            // value is "YY" but not this year or last year
            value = getCentury(value) + value;
        }

        if(value.length == 7 && value[6] == '-') {
            // value is "YYMMDD-"
            value = getCentury(value.slice(0, 2)) + value;
        }

        if(value.length == 8 && value.indexOf('-') == -1) {
            value += '-';
        }

        if(value.length == 12 && value.indexOf('-') == -1) {
            var newValue = value.slice(0, 8) + '-' + value.slice(8);
            if(validate.personnummer(newValue)) {
                value = newValue;
            }
        }

        return value;
    }

    function formatPaste(value) {
        if(value.length < 2) {
            return value;
        }

        if(value.length == 10) {
            value = getCentury(value.slice(0, 2)) + value;
        }

        if(value.length == 12) {
            value = value.slice(0, 8) + '-' + value.slice(8);
        }

        return value;
    }

    function getCentury(year) {
        if(year > yearNow) {
            return centuryNow - 1
        }
        return centuryNow;
    }

    return {
        restrict: 'A',
        require: 'ngModel',
        link: function(scope, elm, attrs, ctrl) {
            ctrl.$validators.personnummer = function(modelValue, viewValue) {
                return ctrl.$isEmpty(modelValue) || validate.personnummer(viewValue);
            }

            var listener = function() {
                var value = elm.val().replace(/[^0-9\-]/g, '').replace('--', '-');
                value = format(value);
                if(value != elm.val()) {
                    elm.val(value);
                    if($sniffer.hasEvent('input')) {
                        elm.triggerHandler('input');
                    } else { // IE 11 Fix
                        elm.triggerHandler('change');
                    }
                }
            }

            var pasteListener = function() {
                var value = elm.val().replace(/[^0-9\-]/g, '').replace('--', '-');
                value = formatPaste(value);
                if(value != elm.val()) {
                    elm.val(value);
                    if($sniffer.hasEvent('input')) {
                        elm.triggerHandler('input');
                    } else { // IE 11 Fix
                        elm.triggerHandler('change');
                    }
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

            elm.bind('change', pasteListener);
        }
    }
}]);
