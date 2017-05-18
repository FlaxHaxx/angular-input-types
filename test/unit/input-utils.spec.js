describe('number', function () {
    beforeEach(module('inputTypes'));

    describe('inputUtils', function () {
        var inputUtils;
        var inputElement;
        beforeEach(inject(function ($compile, $rootScope, $injector) {
            inputUtils = $injector.get('inputUtils');
            inputElement = $compile(angular.element('<input type="text" name="personnummer" ng-model="personnummer" />'))($rootScope);
            $rootScope.$digest();
        }));
        it('should get cursor position', function () {
            inputElement.selectionStart = 15;
            expect(inputUtils.getCursorPos(inputElement)).toBe(15);
        });
        it('should set cursor position', function () {
            inputUtils.setCursorPos(inputElement, 0);
            // expect(inputElement.selectionStart).toBe(0);
        });
    });
});
