import React from 'react'
import { IndexLink, Link } from 'react-router'

const HomeView =  React.createClass({
	getInitialState() {
    return {
        checked: this.props.leftNav.leftNavOpen || false
     };
	},
	handleClick(e) {
      this.setState({checked: e.target.checked});
  	},
	render(){
		return(	<div>
				 <input type="checkbox" className = "opacity-none" onClick={this.props.leftnavstatechange} checked={this.checked} id="show-menu" role="button" onChange={this.onChange}></input>
				  <div for="show-menu" className="show-menu">Show Menu</div>
					<ul id="menu">
						<li><IndexLink to='/' >Home</IndexLink></li>
						<li>
							<Link to='/counter'>About</Link>
						</li>
						<li>
							<a href="#">Portfolio &#65516;</a>
							<ul className="hidden">
								<li><a href="#">Photography</a></li>
								<li><a href="#">Web &amp; User Interface Design</a></li>
								<li><a href="#">Illustration</a></li>
							</ul>
						</li>
						<li><a href="#">News</a></li>
						<li><a href="#">Contact</a></li>
					</ul>
				</div>)
	}

})

HomeView.propTypes = {
  leftNav: React.PropTypes.object.isRequired,
  leftnavstatechange: React.PropTypes.func.isRequired
}

export default HomeView
