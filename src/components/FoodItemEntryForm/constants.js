import moment from 'moment';

export function daysOfTheWeek(date) {
    let result = [];
    for (let i = 0; i < 7; i++) {
        let newDate = moment(date).add(i, 'days');
        result.push({
            value: moment().startOf('day').utc().format(),
            label: newDate.format("dddd, MMM Do")
        });
    }
    return result;
}

export function timeOfDay() {
    let result = [];
    for (var i = 0; i < 48; i++) {
        if (i > 13 && i < 42) {
            let label = (i > 24) ? (Math.floor(i / 2) - 12) + ":" + ((i % 2 === 0) ? '00' : '30') + ' pm' : Math.floor(i / 2) + ":" + ((i % 2 === 0) ? '00' : '30') + ' am';
            result.push({
                label: label,
                value: i * 30 * 60 * 1000
            })
        }

    }
    return result;
}
export function resolvePickUpTime(timeInMills) {
    let time = timeOfDay();
    let result = '';
    for (var i = 0; i < time.length; i++) {
        if (time[i].value == parseInt(timeInMills)) {
            result = time[i].label;
            break;
        }
    }
    return result;
}
