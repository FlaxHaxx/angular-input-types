describe('number', function () {
    beforeEach(module('inputTypes'));

    describe('inputNumber', function () {
        var form;
        beforeEach(inject(function ($compile, $rootScope) {
            var element = angular.element('<form name="form"><input type="tel" name="number" ng-model="number" input-number min="-1000" /></form>');
            $compile(element)($rootScope);
            $rootScope.$digest();
            form = $rootScope.form;
        }));
        it('should validate empty number', function () {
            expect(form.number.$valid).toBe(true);
        });
        it('should validate 100', function () {
            form.number.$setViewValue('100');
            expect(form.number.$valid).toBe(true);
        });
        it('should validate 1 000', function () {
            form.number.$setViewValue('1 000');
            expect(form.number.$valid).toBe(true);
        });
        it('should validate -0', function () {
            form.number.$setViewValue('0');
            expect(form.number.$valid).toBe(true);
        });
        it('should validate -100', function () {
            form.number.$setViewValue('-100');
            expect(form.number.$valid).toBe(true);
        });
        it('should validate -1 000', function () {
            form.number.$setViewValue('-1 000');
            expect(form.number.$valid).toBe(true);
        });
        it('should not validate -1 001 (attribute "min" is set to -1000)', function () {
            form.number.$setViewValue('-1 001');
            expect(form.number.$valid).toBe(false);
        });
    });
});
