const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');
const timezone = require('dayjs/plugin/timezone');

dayjs.extend(utc);
dayjs.extend(timezone);

function now() {
    const timezone = dayjs().tz(process.env.TIME_ZONE);
    const date = timezone.format('YYYY-MM-DD HH:mm:ss');
    return date;
}

function addOneHour(hours, type) {
    const timezone = dayjs().tz(process.env.TIME_ZONE);
    const date = timezone.add(hours, type).format('YYYY-MM-DD HH:mm:ss');
    return date;
}
module.exports = { now, addOneHour };