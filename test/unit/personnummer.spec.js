describe('personnummer', function () {
    beforeEach(module('inputTypes'));

    describe('inputPersonnummer', function () {
        var form;
        beforeEach(inject(function ($compile, $rootScope) {
            var element = angular.element('<form name="form"><input type="tel" name="personnummer" ng-model="personnummer" input-personnummer /></form>');
            $compile(element)($rootScope);
            $rootScope.$digest();
            form = $rootScope.form;
        }));
        it('should validate empty personnummer', function () {
            expect(form.personnummer.$valid).toBe(true);
        });
        it('should validate personnummer 20121212-1212', function () {
            form.personnummer.$setViewValue('20121212-1212');
            expect(form.personnummer.$valid).toBe(true);
        });
        it('should not validate personnummer 121212-1212', function () {
            form.personnummer.$setViewValue('121212-1212');
            expect(form.personnummer.$valid).toBe(false);
        });
        it('should not validate personnummer 201212121212', function () {
            form.personnummer.$setViewValue('201212121212');
            expect(form.personnummer.$valid).toBe(false);
        });
        it('should not validate organisationsnummer 556100-1123 (aktiebolag)', inject(function (validate) {
            form.personnummer.$setViewValue('556100-1123');
            expect(form.personnummer.$valid).toBe(false);
        }));
        it('should not validate organisationsnummer 16556100-1123 (aktiebolag)', inject(function (validate) {
            form.personnummer.$setViewValue('16556100-1123');
            expect(form.personnummer.$valid).toBe(false);
        }));
        it('should not validate personnummer 201212121-1234 (wrong kontrollsiffra)', function () {
            form.personnummer.$setViewValue('201212121-1234');
            expect(form.personnummer.$valid).toBe(false);
        });
    });
});
