import React from 'react';
import Carousel from 'nuka-carousel'
import './search.scss'
import IconButton from 'material-ui/IconButton';
import NavigationArrowForward from 'material-ui/svg-icons/navigation/arrow-forward';
import NavigationArrowBack from 'material-ui/svg-icons/navigation/arrow-back';

const Decorators = [{
		  component: React.createClass({
		    render() {
				return (<div className="arrow-decorator">
							<IconButton
								onClick={this.props.previousSlide}
								disableTouchRipple={true}
							>
								<NavigationArrowBack/>
							</IconButton>
						</div>
				)
		    }
		  }),
		  position: 'CenterLeft',
		  style: {
		    right:'100%',
		    left: 'auto'
		  }
		},{
		  component: React.createClass({
		    render() {
		    	return (<div className="arrow-decorator">
			    			<IconButton
								onClick={this.props.nextSlide}
								disableTouchRipple={true}
							>
								<NavigationArrowForward/>
							</IconButton>
						</div>
				)
		    }
		  }),
		  position: 'CenterRight',
		  style: {
		    left:'100%',
		    right: 'auto'
		  }
		}
		];

export default Decorators;