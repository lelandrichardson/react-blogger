
var MONTHS = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
];

export function ensure(date) {
    return date instanceof Date ? date : new Date(date);
}

export function timeAgo(date) {
    if (date === null || date === undefined) {
        return null;
    }

    var sPerDay = 86400,
        secs = (((new Date()).getTime() - ensure(date).getTime()) / 1000),
        days = Math.floor(secs / sPerDay);

    return secs < 60 && "just now" ||
        secs < 120 && "a minute ago" ||
        secs < 2700 && Math.floor(secs / 60) + " minutes ago" ||
        secs < 7200 && "an hour ago" ||
        secs < sPerDay && Math.floor(secs / 3600) + " hours ago" ||
        days === 1 && "yesterday" ||
        days < 30 && days + " days ago" ||
        short(date);
}

export function short(date) {
    if (date === null || date === undefined) {
        return null;
    }
    date = ensure(date);
    return `${MONTHS[date.getMonth()]} ${date.getDate()} ${date.getFullYear()}`;
}

export function utc(date) {
    if (date === null || date === undefined) {
        return null;
    }
    return ensure(date).toUTCString();
}