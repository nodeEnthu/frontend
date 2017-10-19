import { WEEK_DAYS_JOB, MEALS, JOB_CUISINES } from 'routes/Search/constants/searchFilters'
import moment from 'moment'
import {normalizeDates} from 'routes/Search/constants/searchFilters'
export default function normalizeJobDetails(jobDetails) {
  let normalizedJob = {
    weekdays: [],
    meals: [],
    cuisines: []
  };
  for (let key in jobDetails) {
    if (jobDetails.hasOwnProperty(key)) {
      let isMeal, isCuisine, isWeekDay;
      MEALS.forEach(function(meal, index) {
        if (meal.value === key) {
          normalizedJob.meals.push(meal.label);
          isMeal = true
        }
      })
      if (!isMeal) {
        JOB_CUISINES.forEach(function(cuisine, index) {
          if (cuisine.value === key) {
            normalizedJob.cuisines.push(cuisine.label);
            isCuisine = true
          };
        })
      }
      if (!isMeal && !isCuisine) {
        WEEK_DAYS_JOB.forEach(function(weekday) {
          if (weekday.value === key) { 
          	normalizedJob.weekdays.push(weekday.label);
          	isWeekDay = true;
          }
        }) 
      }
      if(!isMeal && !isCuisine &&  !isWeekDay){
      	normalizedJob[key] = jobDetails[key];
      }
    }
  }
  let address, startDate, endDate;
  let addressArr = jobDetails.address.split(',');
  //check whether the first word is a house address
  let numPattern = /^[0-9\-]+$/;
  address = (!numPattern.test(addressArr[0])) ? addressArr[0] : addressArr[1];
  normalizedJob.start_date = normalizeDates(moment.utc(normalizedJob.start_date).toDate());
  normalizedJob.end_date = normalizeDates(moment.utc(normalizedJob.end_date).toDate());

  startDate = moment.utc(normalizedJob.start_date).format("MMM D");
  endDate = moment.utc(normalizedJob.end_date).format("MMM D");

  normalizedJob.title = normalizedJob.meals.join(' & ') + ' near ' + address + ' from ' + startDate + ' to ' + endDate;
  return normalizedJob;
}
