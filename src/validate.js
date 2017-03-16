angular.module('inputTypes')

    .factory('validate', function () {
        function personnummer(value) {
            if (value.length != 13) {
                return false;
            }

            if (!dateOrSamordningsnummer(value)) {
                return false;
            }

            return luhnAlgoritm(value);
        }
        
        function orgnr(value) {
            if(value.length != 11 && value.length != 13) {
                return false;
            }

            if (!value.match(/^(\d{2})?(\d{2})(\d{2})(\d{2})\-(\d{4})$/)) {
                return false;
            }
            if(parseInt(RegExp.$3) < 20) {
                return personnummer(value.length == 11 ? '20' + value : value);
            }

            if(RegExp.$1 != '' && RegExp.$1 != 16) {
                return false;
            }

            return luhnAlgoritm(value);
        }

        function dateOrSamordningsnummer(value) {
            if (!value.match(/^(\d{4})(\d{2})(\d{2})\-(\d{4})$/)) {
                return false;
            }

            var date = new Date(RegExp.$1, RegExp.$2 - 1, RegExp.$3 < 61 ? RegExp.$3 : 1);
            if(RegExp.$1 < 1840 || date.getFullYear() != RegExp.$1 || date.getMonth() != RegExp.$2 - 1 || (date.getDate() != RegExp.$3 && (RegExp.$3 < 61 || RegExp.$3 > 91))) {
                return false;
            }

            return true;
        }

        function luhnAlgoritm(value) {
            value = value.replace('-', '');
            if(value.length == 12) {
                value = value.substring(2);
            }
            
            var sum = 0;
            for (var i = 0; i < 10; i++) {
                var digit = parseInt(value.charAt(i));
                if (i % 2 === 0) {
                    digit *= 2;
                }
                if (digit > 9) {
                    digit -= 9;
                }
                sum += digit;
            }
            return (sum % 10) === 0;
        }

        return {
            personnummer: personnummer,
            orgnr: orgnr
        }
    });
