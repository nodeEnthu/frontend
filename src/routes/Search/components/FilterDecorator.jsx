import React from 'react';
import Carousel from 'nuka-carousel'
import './search.scss'
import IconButton from 'material-ui/IconButton';
import NavigationArrowForward from 'material-ui/svg-icons/navigation/arrow-forward';
import NavigationArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
import createReactClass from 'create-react-class';

const Decorators = [{
		  component: createReactClass({
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
		  component: createReactClass({
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