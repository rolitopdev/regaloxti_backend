const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');
const timezone = require('dayjs/plugin/timezone');

dayjs.extend(utc);
dayjs.extend(timezone);

function nowInChile() {
    const timeZoneChile = dayjs().tz(process.env.TIME_ZONE);
    const dateChile = timeZoneChile.format('YYYY-MM-DD HH:mm:ss');
    return dateChile;
}

function addOneHour(hours, type) {
    const timeZoneChile = dayjs().tz(process.env.TIME_ZONE);
    const dateChile = timeZoneChile.add(hours, type).format('YYYY-MM-DD HH:mm:ss');
    return dateChile;
}
module.exports = { nowInChile, addOneHour };