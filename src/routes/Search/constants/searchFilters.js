import moment from 'moment'

export const CUISINE_TYPES = [{
    type: 'Asian',
    src: 'cuisines/cuisine-asian.svg'
}, {
    type: 'American',
    src: 'cuisines/cuisine-american.svg'
}, {
    type: 'Indian',
    src: 'cuisines/cuisine-indian.svg'
}, {
    type: 'African',
    src: 'cuisines/cuisine-african.svg'
}, {
    type: 'Italian',
    src: 'cuisines/cuisine-italian.svg'
}, {
    type: 'Mediterrnean',
    src: 'cuisines/cuisine-mediterranean.svg'
}, {
    type: 'Mexican',
    src: 'cuisines/cuisine-mexican.svg'
}, {
    type: 'Bbq',
    src: 'cuisines/cuisine-bbq.svg'
}, {
    type: 'French',
    src: 'cuisines/cuisine-french.svg'
}, {
    type: 'Greek',
    src: 'cuisines/cuisine-greek.svg'
}, {
    type: 'Dessert',
    src: 'cuisines/cuisine-dessert.svg'
}]

export function DATES() {
    let result = [];
    // return today and six more days
    for (var i = 0; i < 7; i++) {
        let day = moment(new Date()).subtract(i, "days").startOf('day');
        result.push({
            value: day.valueOf(),
            title: day.format("ddd, MMM D")
        })
    }
    return result;
}

export const DIET_TYPES = [{
    value: 'organic',
    label: 'organic'
}, {
    value: 'vegetarian',
    label: 'vegetarian'
}, {
    value: 'nutfree',
    label: 'nutfree'
}, {
    value: 'glutenfree',
    label: 'glutenfree'
}, {
    value: 'oilfree',
    label: 'oilfree'
}, {
    value: 'nondairy',
    label: 'nondairy'
}, {
    value: 'indianfasting',
    label: 'indianfasting'
}]

export const RADIUS_OPTIONS = [
    { value: '3', label: '3' },
    { value: '5', label: '5' },
    { value: '10', label: '10' },
    { value: '15', label: '15' }
];
export const ORDER_TYPE = [
    { value: 'pickUpFlag', label: 'pick-up' },
    { value: 'doYouDeliverFlag', label: 'delivery' }
];
