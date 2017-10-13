import React from 'react';
import './jobsList.scss';
import {securedGetCall,postCall} from 'utils/httpUtils/apiCallWrapper';
import moment from 'moment';
import createReactClass from 'create-react-class'
import {WEEK_DAYS_JOB, MEALS, JOB_CUISINES} from 'routes/Search/constants/searchFilters'
import PropTypes from 'prop-types';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';

const styles = {
  labelSettings:{},
  descSettings:{}
}
const JobsList = createReactClass({
  getInitialState() {
    return{
      jobsList:[]
    }
  },
  componentDidMount() {
    let self = this;
    securedGetCall('/api/job/list/all')
        .then(function(res){
          console.log(res.data);
          self.setState({jobsList:res.data});
        });
  },
  contextTypes: {
    router: PropTypes.object.isRequired
  },
  createTitle(job){
    let address, meals = [],startDate, endDate;
    MEALS.forEach(function(meal){
      if(job[meal.value])meals.push(meal.label)
    })
    let addressArr = job.address.split(',');
    //check whether the first word is a house address
    let numPattern = /^[0-9\-]+$/;
    address = (!numPattern.test(addressArr[0]))? addressArr[0] : addressArr[1];
    startDate= moment.utc(job.start_date).format("MMM D");
    endDate = moment.utc(job.end_date).format("MMM D");
    let title = meals.join(' & ') + ' near '+address +' from '+startDate +' to '+endDate;
    return title;
  },
  render(){
    const {jobsList} = this.state; 
    let self = this;
    return(
        <div className="jobs-list">
          {
            (jobsList.length>0)?
            <div>
              <h2>
                Your tiffin requirements
              </h2>
              <div className="create-job-button">
                <FloatingActionButton onClick={()=>this.context.router.push('/job/create')}
                >
                  <ContentAdd />
                </FloatingActionButton>
              </div>
            </div>
            :
            <div className="empty-page-container" onClick={()=>self.context.router.push('/job/create')}>
              <p>
                Oops you have no tiffin requirements posted here. Get started by posting one !
              </p>
              <RaisedButton label="Get Started" style={{marginBottom:'1em'}} />
              <img style={{width:'100%'}} src="/general/man_eating_pasta.jpg"/>
            </div>
          }
          <div className="list-wrapper">
            {
              jobsList.map(function(job,index){
                return <Paper key = {index+' job'} className="job-container">
                          <div className="job-heading" onClick={()=>self.context.router.push(`/job/${job._id}/summary`)}>
                            <span>{self.createTitle(job)}</span>
                          </div>
                          <div className="container pure-g">
                            <div className="column pure-u-1-3" onClick={()=>self.context.router.push(`/job/${job._id}/invite`)}>
                              <div className= "job-sub-heading">Invites</div>
                              <div className="job-attr-desc">{job.invitees.length}</div>
                            </div>
                            <div className="column pure-u-1-3" onClick={()=>self.context.router.push(`/job/${job._id}/proposals`)}>
                              <div className= "job-sub-heading">Proposals</div>
                              <div className="job-attr-desc">{job.applicants.length}</div>
                            </div>
                            <div className="column pure-u-1-3" onClick={()=>self.context.router.push(`/job/${job._id}/hired`)}>
                              <div className= "job-sub-heading">Hires</div>
                              <div className="job-attr-desc">{job.hirees.length}</div>
                            </div>
                          </div>
                        </Paper>
              })
            }
          </div>
          
        </div>
  )}
})

JobsList.propTypes = {}
export default JobsList;