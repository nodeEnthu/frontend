import moment from 'moment'

export const CUISINE_TYPES = [{
    value: 'asian',
    src: 'cuisines/cuisine-asian.svg'
}, {
    value: 'american',
    src: 'cuisines/cuisine-american.svg'
}, {
    value: 'indian',
    src: 'cuisines/cuisine-indian.svg'
}, {
    value: 'african',
    src: 'cuisines/cuisine-african.svg'
}, {
    value: 'italian',
    src: 'cuisines/cuisine-italian.svg'
}, {
    value: 'mediterrnean',
    src: 'cuisines/cuisine-mediterranean.svg'
}, {
    value: 'mexican',
    src: 'cuisines/cuisine-mexican.svg'
}, {
    value: 'bbq',
    src: 'cuisines/cuisine-bbq.svg'
}, {
    value: 'french',
    src: 'cuisines/cuisine-french.svg'
}, {
    value: 'greek',
    src: 'cuisines/cuisine-greek.svg'
}, {
    value: 'dessert',
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
    src: 'diets/organic.svg'
}, {
    value: 'vegetarian',
    src: 'diets/vegetarian.svg'
}, {
    value: 'nutfree',
    src: 'diets/organic.svg'
}, {
    value: 'glutenfree',
    src: 'diets/gluten-free.svg'
}, {
    value: 'oilfree',
    src: 'diets/oil-free.svg'
}, {
    value: 'nondairy',
    src: 'diets/dairy-free.svg'
}, {
    value: 'indianfasting',
    src: 'diets/indian-fasting.svg'
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
