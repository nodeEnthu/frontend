import React from 'react';
import Carousel from 'nuka-carousel'

import IconButton from 'material-ui/IconButton';
import NavigationArrowForward from 'material-ui/svg-icons/navigation/arrow-forward';
import NavigationArrowBack from 'material-ui/svg-icons/navigation/arrow-back';

const Decorators = [{
		  component: React.createClass({
		    render() {
				return (
					(this.props.currentSlide ===0)?
					<IconButton
						onClick={this.props.nextSlide}
						disableTouchRipple={true}
					>
						<NavigationArrowForward/>
					</IconButton>
				    :
				    <div></div>
				)
		    }
		  }),
		  position: 'TopRight'
		},{
		  component: React.createClass({
		    render() {
		    	return (
					(this.props.currentSlide ===1)?
				    <IconButton
						onClick={this.props.previousSlide}
						disableTouchRipple={true}
					>
						<NavigationArrowBack/>
					</IconButton>
				    :
				    <div></div>
				)
		    }
		  }),
		  position: 'TopLeft'
		}
		];

export default Decorators;