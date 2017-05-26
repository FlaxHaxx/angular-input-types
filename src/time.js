angular.module('inputTypes')

.directive('inputTime', ['$browser', 'validate', function($browser, validate) {
    function setViewValue(inputElement, value) {
        inputElement.val(value === null ? '' : value);
        inputElement.triggerHandler('input');
    }

    return {
        restrict: 'A',
        require: 'ngModel',
        link: function(scope, elm, attrs, ctrl) {
            ctrl.$validators.time = function(modelValue, viewValue) {
                return ctrl.$isEmpty(modelValue) || validate.time(viewValue);
            }

            ctrl.$parsers.unshift(function(viewValue) {
                if(!viewValue) {
                    return viewValue;
                }

                var newValue = viewValue.trim();

                if(newValue.indexOf(':') == 4) {
                    newValue = newValue.replace(':', '');
                }

                if(newValue.length == 2 && newValue.indexOf(':') === -1) {
                    newValue += ':';
                    setViewValue(elm, newValue);
                    return newValue;
                }

                if(newValue.charAt(2) == 2 && newValue.indexOf(':') === -1) {
                    newValue += ':';
                    setViewValue(elm, newValue);
                    return newValue;
                }

                if(newValue.length != 5) {
                    newValue = newValue.substring(0, 5);
                    setViewValue(elm, newValue);
                    return newValue;
                }

                return newValue;
            });

            var time = scope[attrs.ngModel];
            if(time != null) {
                setViewValue(elm, time.getHours() + ':' + time.getMinutes());

            }
        }
    }
}]);
