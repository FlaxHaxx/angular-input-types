describe('orgnr', function () {
    beforeEach(module('inputTypes'));
    describe('inputOrgnr', function () {
        var form;
        beforeEach(inject(function ($compile, $rootScope) {
            var element = angular.element('<form name="form"><input type="tel" name="orgnr" ng-model="orgnr" input-orgnr /></form>');
            $compile(element)($rootScope);
            $rootScope.$digest();
            form = $rootScope.form;
        }));
        it('should validate tomt orgnr', function () {
            expect(form.orgnr.$valid).toBe(true);
        });
        it('should validate personnummer 20121212-1212', function () {
            form.orgnr.$setViewValue('20121212-1212');
            expect(form.orgnr.$valid).toBe(true);
        });
        it('should validate organisationsnummer 556100-1123 (aktiebolag)', inject(function (validate) {
            form.orgnr.$setViewValue('556100-1123');
            expect(form.orgnr.$valid).toBe(true);
        }));
        it('should validate organisationsnummer 16556100-1123 (aktiebolag)', inject(function (validate) {
            form.orgnr.$setViewValue('16556100-1123');
            expect(form.orgnr.$valid).toBe(true);
        }));
        it('should validate personnummer 121212-1212', function () {
            form.orgnr.$setViewValue('121212-1212');
            expect(form.orgnr.$valid).toBe(true);
        });
        it('should not validate personnummer 201212121212', function () {
            form.orgnr.$setViewValue('201212121212');
            expect(form.orgnr.$valid).toBe(false);
        });
        it('should not validate orgnr 201212121-1234 (kontrollsiffra)', function () {
            form.orgnr.$setViewValue('201212121-1234');
            expect(form.orgnr.$valid).toBe(false);
        });
    });
});
