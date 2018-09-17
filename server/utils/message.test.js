const expect = require('expect');
const { generateMessage } = require('./message');

describe('generateMessage', () => {
    it('should generate correct message object', () => {
        const from = 'user';
        const text = 'test'
        //store res in variable
        const message = generateMessage(from, text);

        //assert from match
        // assert text match
        expect(message).toInclude({ from, text })
        //assert createdAt is number
        expect(message.createdAt).toBeA('number')
    })
})