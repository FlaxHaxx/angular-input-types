describe('number', function () {
    beforeEach(module('inputTypes'));

    describe('inputNumber', function () {
        var form;
        beforeEach(inject(function ($compile, $rootScope) {
            var element = angular.element('<form name="form"><input type="tel" name="number" ng-model="number" input-number /></form>');
            $compile(element)($rootScope);
            $rootScope.$digest();
            form = $rootScope.form;
        }));
        it('should validate empty number', function () {
            expect(form.number.$valid).toBe(true);
        });
    });
});
