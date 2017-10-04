import React from 'react';
import './jobSummary.scss';
import createReactClass from 'create-react-class'
import PropTypes from 'prop-types';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import {WEEK_DAYS_JOB, MEALS, JOB_CUISINES} from 'routes/Search/constants/searchFilters'
import {
  Table,
  TableBody,
  TableRow,
  TableRowColumn
} from 'material-ui/Table';

const JobSummary = createReactClass({
  componentDidMount() {

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
            <Card>
              <CardHeader
                title="URL Avatar"
                subtitle="Subtitle"
                avatar="http://lorempixel.com/400/200/sports/"
              />
              <CardText>
                <Table>
                  <TableBody displayRowCheckbox={false}>
                    <TableRow>
                      <TableRowColumn>Location</TableRowColumn>
                      <TableRowColumn>
                        <div>
                          {jobDetails.address}
                        </div>
                        <div>
                          {jobDetails.addtnlAddressComments}
                        </div>
                      </TableRowColumn>
                    </TableRow>
                    <TableRow>
                      <TableRowColumn>Number of people</TableRowColumn>
                      <TableRowColumn>{jobDetails.partysize}</TableRowColumn>
                    </TableRow>
                    <TableRow>
                      <TableRowColumn>Delivery Type</TableRowColumn>
                      <TableRowColumn>{jobDetails.serviceType}</TableRowColumn>
                    </TableRow>
                    <TableRow>
                      <TableRowColumn>How often</TableRowColumn>
                      <TableRowColumn>{jobDetails.frequency}</TableRowColumn>
                    </TableRow>
                    <TableRow>
                      <TableRowColumn>Dates</TableRowColumn>
                      <TableRowColumn>{jobDetails.start_date} to {jobDetails.end_date}</TableRowColumn>
                    </TableRow>
                    <TableRow>
                      <TableRowColumn>Day(s)</TableRowColumn>
                      <TableRowColumn>{weekdays.join(' , ')}</TableRowColumn>
                    </TableRow>
                    <TableRow>
                      <TableRowColumn>Meal(s)</TableRowColumn>
                      <TableRowColumn>{meals.join(' , ')}</TableRowColumn>
                    </TableRow>
                    <TableRow>
                      <TableRowColumn>Cuisines(s)</TableRowColumn>
                      <TableRowColumn>{cuisines.join(' , ')}</TableRowColumn>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardText>
            </Card>
          )
  }
})

JobSummary.propTypes = {
  jobDetails:PropTypes.object
}

export default JobSummary;