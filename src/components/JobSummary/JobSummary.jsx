import React from 'react';
import './jobSummary.scss';
import createReactClass from 'create-react-class'
import PropTypes from 'prop-types';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import {WEEK_DAYS_JOB, MEALS, JOB_CUISINES} from 'routes/Search/constants/searchFilters'
import moment from 'moment'
import {
  Table,
  TableBody,
  TableRow,
  TableRowColumn
} from 'material-ui/Table';

const styles = {
  labelSettings:{width:'30%', padding:0,whiteSpace:'normal'},
  descSettings:{ paddingLeft:'0.5em', whiteSpace:'normal'}
}
const JobSummary = createReactClass({
  componentDidMount() {

  },
  resolveDates(date){
    return moment.utc(date).format("Do,MMM ddd");
  },
  render(){
    const {jobDetails} = this.props;
    let weekdays = [], meals = [],cuisines = [];
    for(let key in jobDetails ){
      if(jobDetails.hasOwnProperty(key)){
        let isMeal , isCuisine;
        MEALS.forEach(function(meal,index){
          if(meal.value === key){meals.push(meal.label); isMeal = true}
        })
        if(!isMeal){
          JOB_CUISINES.forEach(function(cuisine,index){
            if(cuisine.value === key){cuisines.push(cuisine.label); isCuisine = true};
          })
        }
        if(!isMeal && !isCuisine){
          WEEK_DAYS_JOB.forEach(function(weekday){
            if(weekday.value === key){weekdays.push(weekday.label)};
          })
        }
      }
    }
    return( 
            <Table>
              <TableBody displayRowCheckbox={false}>
                <TableRow>
                  <TableRowColumn style={styles.labelSettings}>Location:</TableRowColumn>
                  <TableRowColumn style={styles.descSettings}>
                    <div>
                      {jobDetails.address}
                    </div>
                    <div>
                      {jobDetails.addtnlAddressComments}
                    </div>
                  </TableRowColumn>
                </TableRow>
                <TableRow>
                  <TableRowColumn style={styles.labelSettings}>Number of people:</TableRowColumn>
                  <TableRowColumn style = {styles.descSettings}>{jobDetails.partysize}</TableRowColumn>
                </TableRow>
                <TableRow>
                  <TableRowColumn style={styles.labelSettings}>Delivery Type:</TableRowColumn>
                  <TableRowColumn style={styles.descSettings}>{jobDetails.serviceType}</TableRowColumn>
                </TableRow>
                <TableRow>
                  <TableRowColumn style={styles.labelSettings}>Dates:</TableRowColumn>
                  <TableRowColumn style={styles.descSettings}>{this.resolveDates(jobDetails.start_date)} - {this.resolveDates(jobDetails.end_date)}</TableRowColumn>
                </TableRow>
                <TableRow>
                  <TableRowColumn style={styles.labelSettings}>Day(s):</TableRowColumn>
                  <TableRowColumn style={styles.descSettings}>{weekdays.join(' , ')}</TableRowColumn>
                </TableRow>
                <TableRow>
                  <TableRowColumn style={styles.labelSettings}>Meal(s):</TableRowColumn>
                  <TableRowColumn style={styles.descSettings}>{meals.join(' , ')}</TableRowColumn>
                </TableRow>
                <TableRow>
                  <TableRowColumn style={styles.labelSettings}>Cuisine(s):</TableRowColumn>
                  <TableRowColumn style={styles.descSettings}>{cuisines.join(' , ')}</TableRowColumn>
                </TableRow>
              </TableBody>
            </Table>
              
          )
  }
})

JobSummary.propTypes = {
  jobDetails:PropTypes.object
}

export default JobSummary;