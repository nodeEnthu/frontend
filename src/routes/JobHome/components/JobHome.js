import React from 'react';
import createReactClass from 'create-react-class'
import PropTypes from 'prop-types';
import {Card, CardActions, CardHeader, CardText, CardTitle} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import './jobHome.scss';
import { Link } from 'react-router';

const JobHome = createReactClass({
	getInitialState() {
		return{};
	},
  	render(){
	    return (
	    <div className="job-home">
	    	<div className="heading-title">
	    		<h1>
	    			Need organic home made food
	    		</h1>
	    	</div>
			<div className='breadcrumbs'>
			  <div className='inner'>
			    <ul className='cf'>
			      <li>
			        <Link to='/job/home/summary'>job</Link>
			      </li>
			      <li>
			          <Link to='/job/home/invite'>invite</Link>
			      </li>
			      <li>
			        <Link to='/job/home/proposals'>proposals</Link>
			      </li>
			    </ul>
			  </div>
			</div>
			{this.props.children}
	    </div>)
  }
})

JobHome.propTypes = {}
export default JobHome;