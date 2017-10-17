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

export function DATES(n, format, action) {
  let result = [];
  format = format || "ddd, MMM D";
  let day;
  // return today and six more days
  for (var i = 0; i < n; i++) {
    let date = new Date();
    // this will take us to "2017-10-11T00:00:00.000Z" format 
    day = moment.utc([date.getFullYear(), date.getMonth(), date.getDate()]);
    if (action === 'add') {
      day = day.add(i, "days");
    } else {
      day = day.subtract(i, "days");
    }
    result.push({
      value: day.toISOString(),
      title: day.format(format)
    })
  }
  return result;
}

export function normalizeDateWhileChanging(action, n) {
  let day, date = new Date();
  day = moment.utc([date.getFullYear(), date.getMonth(), date.getDate()]);
  if (action === 'add') {
    day = day.add(n, "days");
  } else {
    day = day.subtract(n, "days");
  }
  return day;
}

/*Proceed with caution ... not tested atall*/
export function normalizeDates(date) {
  return moment.utc([date.getFullYear(), date.getMonth(), date.getDate()]);
}

export const DIET_TYPES = [{
  value: 'organic',
  src: 'diets/organic.svg'
}, {
  value: 'vegetarian',
  src: 'diets/vegetarian.svg'
}, {
  value: 'nutfree',
  src: 'diets/nut-free.svg'
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
}, {
  value: 'nonveg',
  src: 'diets/non-veg.svg'
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
export const PLACE_ORDER_BY = [
  { value: 0, label: 'Same day' },
  { value: 1, label: 'Atleast 1 day before' },
  { value: 2, label: 'Atleast 2 days before' },
  { value: 3, label: 'Atleast 3 days before' }
];
export const CANCEL_REASONS = [
  { value: 1, label: 'Sold out' },
  { value: 2, label: 'User pickup/delivery time is not acceptable' },
  { value: 3, label: 'User address is out of delivery area' },
  { value: 4, label: 'Unknown/incomplete user address for delivery' },
  { value: 5, label: 'Questions about customer authenticity' },
  { value: 6, label: 'Other' }
];

export const WEEK_DAYS_JOB = [
  { value: 'mon', label: 'Mon' },
  { value: 'tue', label: 'Tue' },
  { value: 'wed', label: 'Wed' },
  { value: 'thu', label: 'Thu' },
  { value: 'fri', label: 'Fri' },
  { value: 'sat', label: 'Sat' },
  { value: 'sun', label: 'Sun' }
];

export const MEALS = [
  { value: 'br', label: 'Breakfast' },
  { value: 'lu', label: 'Lunch' },
  { value: 'di', label: 'Dinner' },
]

export const JOB_CUISINES = [
  { value: 've', label: 'Veg' },
  { value: 'nv', label: 'Non-veg' },
]
