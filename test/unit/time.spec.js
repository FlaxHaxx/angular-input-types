describe('time', function () {
    beforeEach(module('inputTypes'));

    describe('time', function () {
        var form;
        beforeEach(inject(function ($compile, $rootScope) {
            var element = angular.element('<form name="form"><input type="time" name="time" ng-model="time" input-time /></form>');
            $compile(element)($rootScope);
            $rootScope.$digest();
            form = $rootScope.form;
        }));
        it('should validate empty time', function () {
            expect(form.time.$valid).toBe(true);
        });
        it('should validate 00:00', function () {
            form.time.$setViewValue('00:00');
            expect(form.time.$valid).toBe(true);
        });
        it('should validate 12:30', inject(function (validate) {
            form.time.$setViewValue('12:30');
            expect(form.time.$valid).toBe(true);
        }));
        it('should validate 23:59', inject(function (validate) {
            form.time.$setViewValue('23:59');
            expect(form.time.$valid).toBe(true);
        }));
        it('should not validate 00:60', inject(function (validate) {
            form.time.$setViewValue('00:60');
            expect(form.time.$valid).toBe(false);
        }));
        it('should not validate 24:00', inject(function (validate) {
            form.time.$setViewValue('24:00');
            expect(form.time.$valid).toBe(false);
        }));
        it('should not validate -1:00', inject(function (validate) {
            form.time.$setViewValue('-1:00');
            expect(form.time.$valid).toBe(false);
        }));
        it('should not validate 00:-1', inject(function (validate) {
            form.time.$setViewValue('00:-1');
            expect(form.time.$valid).toBe(false);
        }));
    });
});
