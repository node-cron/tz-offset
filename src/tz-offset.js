'use strict';

module.exports = (() => {

    const _DTFCache = {};

    function _getDTF(timezone) {
        if (!_DTFCache[timezone]) {
            try {
                const dtf = new Intl.DateTimeFormat('en-US', {
                    hour12: false,
                    timeZone: timezone,
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit'
                });
                _DTFCache[timezone] = dtf;
            } catch(err) {
                throw new Error('Invalid timezone ' + timezone);
            }
        }
        return _DTFCache[timezone];
    }

    function _fromStringFormat(dtf, date) {
        const formatted = dtf.format(date).replace(/\u200E/g, ''),
            parsed = formatted.match(/(\d+)\/(\d+)\/(\d+),? (\d+):(\d+):(\d+)/),
            [, month, day, year, hour, minute, second] = parsed.map(n => parseInt(n, 10));
        return new Date(Date.UTC(year, month - 1, day, hour, minute, second));
    }
    
    function _fromPartsFormat(dtf, date) {
        const formatted = dtf.formatToParts(date);
        return new Date(Date.UTC(
            parseInt(formatted[4].value, 10),
            parseInt(formatted[0].value, 10) - 1,
            parseInt(formatted[2].value, 10),
            parseInt(formatted[6].value, 10),
            parseInt(formatted[8].value, 10),
            parseInt(formatted[10].value, 10)
        ));
    }

    const offsetOf = (timezone, date) => {
        if (!date) date = new Date();

        const timestamp = date.getTime();
        return ((timestamp - (timestamp % 1000)) - timeAt(date, timezone)) / 60000;
    };

    const removeOffset = (date) => {
        const currentOffset = date.getTimezoneOffset() * -60000;
        return date.getTime() - currentOffset;
    };

    const timeAt = (date, timezone) => {
        const dtf = _getDTF(timezone);
        return dtf.formatToParts
            ? _fromPartsFormat(dtf, date)
            : _fromStringFormat(dtf, date);
    };

    return {
        offsetOf,
        removeOffset,
        timeAt
    };
})();
