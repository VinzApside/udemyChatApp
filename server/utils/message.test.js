const expect = require('expect');
const { generateMessage, generateLocationMessage } = require('./message');

describe('generateMessage', () => {
    it('should generate correct message object', () => {
        const from = 'user';
        const text = 'test';
        //store res in variable
        const message = generateMessage(from, text);

        //assert from match
        // assert text match
        expect(message).toInclude({ from, text })
        //assert createdAt is number
        expect(message.createdAt).toBeA('number')
    })
})

describe('generateLocationMessage', () => {
    it('should generate correct location object', () => {
        const from = 'user';
        const latitude = 4;
        const longitude = 4;
        const url = `https://www.google.com/maps?q=4,4`


        const messageLocation = generateLocationMessage(from, latitude, longitude);

        expect(messageLocation).toInclude({ from, url })
        expect(messageLocation.createdAt).toBeA('number')
        expect(messageLocation.from).toBeA('string')
        expect(messageLocation.url).toBeA('string')

    })
})