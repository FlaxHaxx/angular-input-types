describe('validate', function () {
    beforeEach(module('inputTypes'));

    describe('number', function () {
        it('should validate 1', inject(function (validate) {
            expect(validate.number(1)).toBe(true);
        }));
        it('should validate 0', inject(function (validate) {
            expect(validate.number(1)).toBe(true);
        }));
        it('should validate -1', inject(function (validate) {
            expect(validate.number(1)).toBe(true);
        }));
        it('should validate "1"', inject(function (validate) {
            expect(validate.number('1')).toBe(true);
        }));
        it('should validate 1.1', inject(function (validate) {
            expect(validate.number(1.1)).toBe(true);
        }));
        it('should not validate "1,1"', inject(function (validate) {
            expect(validate.number('1,1')).toBe(false);
        }));
        it('should not validate "text"', inject(function (validate) {
            expect(validate.number("text")).toBe(false);
        }));
    });

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
        it('should not validate organisationsnummer 556100-1123 (aktiebolag)', inject(function (validate) {
            expect(validate.personnummer('556100-1123')).toBe(false);
        }));
        it('should not validate organisationsnummer 16556100-1123 (aktiebolag)', inject(function (validate) {
            expect(validate.personnummer('16556100-1123')).toBe(false);
        }));
        it('should not validate 121212-1212', inject(function (validate) {
            expect(validate.personnummer('121212-1212')).toBe(false);
        }));
        it('should not validate 121212+1212', inject(function (validate) {
            expect(validate.personnummer('121212+1212')).toBe(false);
        }));
        it('should not validate 1212121212', inject(function (validate) {
            expect(validate.personnummer('1212121212')).toBe(false);
        }));
        it('should not validate 20121212+1212', inject(function (validate) {
            expect(validate.personnummer('20121212+1212')).toBe(false);
        }));
        it('should not validate 201212121212', inject(function (validate) {
            expect(validate.personnummer('201212121212')).toBe(false);
        }));
        it('should not validate 20121301-1233 (faulty month)', inject(function (validate) {
            expect(validate.personnummer('20121301-1230')).toBe(false);
        }));
        it('should not validate 20121233-1233 (faulty date)', inject(function (validate) {
            expect(validate.personnummer('20121233-1233')).toBe(false);
        }));
        it('should not validate personnummer 19010229-1235 (kontrollsiffra)', inject(function (validate) {
            expect(validate.personnummer('19010229-1235')).toBe(false);
        }));
        it('should not validate 18121212-1212 (first swedish SSN was 18400506-140)', inject(function (validate) {
            expect(validate.personnummer('18121212-1212')).toBe(false);
        }));
    });

    describe('orgnr', function () {
        it('should validate 20121212-1212', inject(function (validate) {
            expect(validate.orgnr('20121212-1212')).toBe(true);
        }));
        it('should validate 20000229-1235 (skottdag)', inject(function (validate) {
            expect(validate.orgnr('20000229-1235')).toBe(true);
        }));
        it('should validate samordningsnummer 19701063-2391', inject(function (validate) {
            expect(validate.orgnr('19701063-2391')).toBe(true);
        }));
        it('should validate organisationsnummer 556100-1123 (aktiebolag)', inject(function (validate) {
            expect(validate.orgnr('556100-1123')).toBe(true);
        }));
        it('should validate organisationsnummer 16556100-1123 (aktiebolag)', inject(function (validate) {
            expect(validate.orgnr('16556100-1123')).toBe(true);
        }));
        it('should validate 121212-1212', inject(function (validate) {
            expect(validate.orgnr('121212-1212')).toBe(true);
        }));
        it('should not validate organisationsnummer 15556100-1123', inject(function (validate) {
            expect(validate.orgnr('15556100-1123')).toBe(false);
        }));
        it('should not validate 121212+1212', inject(function (validate) {
            expect(validate.orgnr('121212+1212')).toBe(false);
        }));
        it('should not validate 1212121212', inject(function (validate) {
            expect(validate.orgnr('1212121212')).toBe(false);
        }));
        it('should not validate 20121212+1212', inject(function (validate) {
            expect(validate.orgnr('20121212+1212')).toBe(false);
        }));
        it('should not validate 201212121212', inject(function (validate) {
            expect(validate.orgnr('201212121212')).toBe(false);
        }));
        it('should not validate 20121301-1233 (faulty month)', inject(function (validate) {
            expect(validate.orgnr('20121301-1230')).toBe(false);
        }));
        it('should not validate 20121233-1233 (faulty date)', inject(function (validate) {
            expect(validate.orgnr('20121233-1233')).toBe(false);
        }));
        it('should not validate personnummer 19010229-1235 (kontrollsiffra)', inject(function (validate) {
            expect(validate.orgnr('19010229-1235')).toBe(false);
        }));
    });

    describe('time', function () {
        it('should validate 00:00', inject(function (validate) {
            expect(validate.time('00:00')).toBe(true);
        }));
        it('should validate 12:30', inject(function (validate) {
            expect(validate.time('12:30')).toBe(true);
        }));
        it('should validate 23:59', inject(function (validate) {
            expect(validate.time('23:59')).toBe(true);
        }));
        it('should not validate 00:60', inject(function (validate) {
            expect(validate.time('00:60')).toBe(false);
        }));
        it('should not validate 24:00', inject(function (validate) {
            expect(validate.time('24:00')).toBe(false);
        }));
        it('should not validate -1:00', inject(function (validate) {
            expect(validate.time('-1:00')).toBe(false);
        }));
        it('should not validate 00:-1', inject(function (validate) {
            expect(validate.time('00:-1')).toBe(false);
        }));
    });
});
