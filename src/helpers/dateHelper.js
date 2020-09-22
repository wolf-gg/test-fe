import moment from 'moment';

export const getDate = (date) => moment(date).format('LL').toString();

export const getSchedule = (to, from) => {
    return `${getTime(from)} - ${getTime(to)}`;
}

export const getTime = (time) => {
    return `${moment(time).format('LT').toString()}`
}

export const getTimeFromRangePicker = (times) => times.map(time => moment(time).format('LT').toString());

export const getMoment = (time) => moment(time, 'LT');

export const getMomentNo = (time) => moment(time);