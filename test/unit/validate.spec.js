describe('validate', function () {
    beforeEach(module('inputTypes'));
    describe('personnummer', function () {
        it('should validate 20121212-1212', inject(function (validate) {
            expect(validate.personnummer('20121212-1212')).toBe(true);
        }));
        it('should validate 20000229-1235 (skottdag)', inject(function (validate) {
            expect(validate.personnummer('20000229-1235')).toBe(true);
        }));
        it('should validate samordningsnummer 19701063-2391', inject(function (validate) {
            expect(validate.personnummer('19701063-2391')).toBe(true);
        }));
        it('should not validate 20121212+1212', inject(function (validate) {
            expect(validate.personnummer('20121212+1212')).toBe(false);
        }));
        it('should not validate 121212-1212', inject(function (validate) {
            expect(validate.personnummer('121212-1212')).toBe(false);
        }));
        it('should not validate 121212+1212', inject(function (validate) {
            expect(validate.personnummer('121212+1212')).toBe(false);
        }));
        it('should not validate 201212121212', inject(function (validate) {
            expect(validate.personnummer('201212121212')).toBe(false);
        }));
        it('should not validate 1212121212', inject(function (validate) {
            expect(validate.personnummer('1212121212')).toBe(false);
        }));
        it('should not validate 20121301-1233 (faulty month)', inject(function (validate) {
            expect(validate.personnummer('20121301-1230')).toBe(false);
        }));
        it('should not validate 20121233-1233 (faulty date)', inject(function (validate) {
            expect(validate.personnummer('20121233-1233')).toBe(false);
        }));
        it('should not validate organisationsnummer 556100-1123 (aktiebolag)', inject(function (validate) {
            expect(validate.personnummer('556100-1123')).toBe(false);
        }));
        it('should not validate organisationsnummer 16556100-1123 (aktiebolag)', inject(function (validate) {
            expect(validate.personnummer('16556100-1123')).toBe(false);
        }));
        it('should not validate personnummer 19010229-1235 (kontrollsiffra)', inject(function (validate) {
            expect(validate.personnummer('19010229-1235')).toBe(false);
        }));
    });
});