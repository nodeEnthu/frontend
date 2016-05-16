import React from 'react'
import { IndexLink, Link } from 'react-router'

const HomeView =  React.createClass({
	getInitialState() {
    return {
        checked: this.props.leftNav.get('leftNavOpen') || false
     };
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
							<Link to='/counter'>Portfolio &#65516;</Link>
							<ul className="hidden">
								<li>
									<Link to='/counter'>News</Link>
								</li>
								<li>
									<Link to='/counter'>News</Link>
								</li>
								<li>
									<Link to='/counter'>News</Link>
								</li>
							</ul>
						</li>
						<li>
							<Link to='/counter'>News</Link>
						</li>
						<li>
							<Link to='/counter'>Contacts</Link>
						</li>
					</ul>
				</div>)
	}

})

HomeView.propTypes = {
  leftNav: React.PropTypes.object.isRequired,
  leftnavstatechange: React.PropTypes.func.isRequired
}

export default HomeView
