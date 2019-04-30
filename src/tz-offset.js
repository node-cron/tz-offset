'use strict';
const offsets = require('../generated/offsets.json');

module.exports = (() => {

    const offsetOf = (timezone) => {
        const offset = offsets[timezone];
        if (offset != undefined && offset != null) {
            return offset;
        } else {
            throw Error('Invalid timezone ' + timezone);
        }
    };

    const removeOffset = (date) => {
        const currentOffset = date.getTimezoneOffset() * -60000;
        return date.getTime() - currentOffset;
    };

    const timeAt = (date, timezone) => {
        const timeUtc = removeOffset(date);
        const offset = offsetOf(timezone) * -60000;
        return new Date(timeUtc + offset);
    };

    return {
        offsetOf,
        removeOffset,
        timeAt
    };
})();
