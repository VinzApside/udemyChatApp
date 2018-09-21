const expect = require('expect');
const { isRealString } = require('./validation');

describe('isRealString', () => {
    it("should reject non-string value", () => {
        const number = 23
        let nonString = isRealString(number);
        expect(nonString).toBe(false);


    }),
        it('shoud reject string with only space', () => {
            const spaceCharacters = ' '
            const space = isRealString(spaceCharacters);
            expect(space).toBe(false);
        }),
        it('should allow string with non-space characters', () => {
            const withSpace = ' dude'
            const spaceX = isRealString(withSpace);
            expect(spaceX).toBe(true);

            const otherSpace = 'L O T R'
            const LOTR = isRealString(otherSpace);
            expect(LOTR).toBe(true);
        })

})