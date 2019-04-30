'use strict';
const tzOffset = require('../src/tz-offset');
const { assert } = require('chai');

process.env.TZ = 'America/Sao_Paulo';

describe('tz-offset', () => {
    it('should return 180 to America/Sao_Paulo', () => {
        assert.equal(tzOffset.offsetOf('America/Sao_Paulo'), 180);
    });

    it('should return -60 to Africa/Algiers', () => {
        assert.equal(tzOffset.offsetOf('Africa/Algiers'), -60);
    });

    it('should return 0 to Europe/London', () => {
        assert.equal(tzOffset.offsetOf('Europe/London'), 0);
    });

    it('should fail with invalid timezone', () => {
        assert.throws(() => {
            tzOffset.offsetOf('Invalid/Timezone');
        }, Error, 'Invalid timezone Invalid/Timezone');
    });

    it('should remove current offset', () => {
        const date = new Date();
        const utcTime = tzOffset.removeOffset(date);
        assert.equal(utcTime, date.getTime() + date.getTimezoneOffset() * 60000);
    });

    it('should return the time at zone', () => {
        const date = new Date(2018, 8, 20, 0, 0, 0, 0);
        const expectedDate = new Date(2018, 8, 20, 3, 0, 0, 0);
        const result = tzOffset.timeAt(date, 'Etc/UTC');
        assert.equal(result.toString(), expectedDate.toString());
    });
});
