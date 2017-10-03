import React from 'react';
import createReactClass from 'create-react-class'
import PropTypes from 'prop-types';
import {Card, CardActions, CardHeader, CardText, CardTitle} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import './jobInvite.scss';
const JobInvite = createReactClass({
	getInitialState() {
		return{};
	},
	handleExpandChange(expanded){
    	this.setState({expanded: expanded});
  	},
  	handleToggle (event, toggle){
    	this.setState({expanded: toggle});
  	},
  	handleExpand(){
    	this.setState({expanded: true});
  	},
  	handleReduce(){
    	this.setState({expanded: false});
  	},
  	render(){
	    return (
	    <div className="job-home">
	    	<div className="reco-wrapper">
				<h3>
					Providers close to you:
				</h3>
			</div>
			<Card expanded={this.state.expanded} onExpandChange={this.handleExpandChange}>
		        <CardHeader
		          title="URL Avatar"
		          subtitle="Subtitle"
		          avatar="http://lorempixel.com/400/200/sports/"
		          actAsExpander={true}
		          showExpandableButton={false}
		          style={{paddingBottom:0}}
		        >
		        </CardHeader>
		        <CardText style={{paddingTop:'0.5em', paddingBottom:'0'}}>
		          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
		        </CardText>
		        <CardActions style={{textAlign:'right'}}>
			      <FlatButton style={{background:'#FFC107', color:'white'}}label="Invite to apply" />
			    </CardActions>
	      </Card>
	      <Card expanded={this.state.expanded} onExpandChange={this.handleExpandChange}>
		        <CardHeader
		          title="URL Avatar"
		          subtitle="Subtitle"
		          avatar="http://lorempixel.com/400/200/sports/"
		          actAsExpander={true}
		          showExpandableButton={true}
		        />
		        <CardTitle title="Card title" subtitle="Card subtitle" expandable={true} />
		        <CardText expandable={true}>
		          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
		          Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
		          Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
		          Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
		        </CardText>
	      </Card>
	      <Card expanded={this.state.expanded} onExpandChange={this.handleExpandChange}>
		        <CardHeader
		          title="URL Avatar"
		          subtitle="Subtitle"
		          avatar="http://lorempixel.com/400/200/sports/"
		          actAsExpander={true}
		          showExpandableButton={true}
		        />
		        <CardTitle title="Card title" subtitle="Card subtitle" expandable={true} />
		        <CardText expandable={true}>
		          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
		          Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
		          Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
		          Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
		        </CardText>
	      </Card>
	      <Card expanded={this.state.expanded} onExpandChange={this.handleExpandChange}>
		        <CardHeader
		          title="URL Avatar"
		          subtitle="Subtitle"
		          avatar="http://lorempixel.com/400/200/sports/"
		          actAsExpander={true}
		          showExpandableButton={true}
		        />
		        <CardTitle title="Card title" subtitle="Card subtitle" expandable={true} />
		        <CardText expandable={true}>
		          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
		          Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
		          Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
		          Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
		        </CardText>
	      </Card>
	      <Card expanded={this.state.expanded} onExpandChange={this.handleExpandChange}>
		        <CardHeader
		          title="URL Avatar"
		          subtitle="Subtitle"
		          avatar="http://lorempixel.com/400/200/sports/"
		          actAsExpander={true}
		          showExpandableButton={true}
		        />
		        <CardTitle title="Card title" subtitle="Card subtitle" expandable={true} />
		        <CardText expandable={true}>
		          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
		          Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
		          Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
		          Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
		        </CardText>
	      </Card>
	    </div>)
  }
})

JobInvite.propTypes = {}
export default JobInvite;