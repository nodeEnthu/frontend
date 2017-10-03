import React from 'react';
import './jobSummary.scss';
import createReactClass from 'create-react-class'
import PropTypes from 'prop-types';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import {
  Table,
  TableBody,
  TableRow,
  TableRowColumn
} from 'material-ui/Table';

const JobSummary = createReactClass({
  render(){
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
                          Mariposa street
                        </div>
                        <div>
                          New wlanut tree and close to nehru garden
                        </div>
                      </TableRowColumn>
                    </TableRow>
                    <TableRow>
                      <TableRowColumn>Number of people</TableRowColumn>
                      <TableRowColumn>2</TableRowColumn>
                    </TableRow>
                    <TableRow>
                      <TableRowColumn>Delivery Type</TableRowColumn>
                      <TableRowColumn>Pick or delivery</TableRowColumn>
                    </TableRow>
                    <TableRow>
                      <TableRowColumn>How often</TableRowColumn>
                      <TableRowColumn>Weekly</TableRowColumn>
                    </TableRow>
                    <TableRow>
                      <TableRowColumn>Dates</TableRowColumn>
                      <TableRowColumn>Jan-28 to Mar-17</TableRowColumn>
                    </TableRow>
                    <TableRow>
                      <TableRowColumn>Day(s)</TableRowColumn>
                      <TableRowColumn>Mon, Tue, Wed, Thu</TableRowColumn>
                    </TableRow>
                    <TableRow>
                      <TableRowColumn>Meal(s)</TableRowColumn>
                      <TableRowColumn>Lunch, Dinner</TableRowColumn>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardText>
            </Card>
          )
  }
})

JobSummary.propTypes = {}

export default JobSummary;