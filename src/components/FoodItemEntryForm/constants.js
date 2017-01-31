import moment from 'moment';

export function daysOfTheWeek(date) {
    let result = [];
    for(let i=0; i < 7;i++){
        let newDate = moment(date).add(i, 'days');
        result.push({
            value: newDate.startOf('day').toISOString(),
            label: newDate.format("dddd, MMM Do")
        });
    }
    return result;
}

