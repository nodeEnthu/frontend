import React from 'react'
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
		console.log(this.props.leftNav);
		return(	<div>
				  <label for="show-menu" className="show-menu">Show Menu</label>
					<input type="checkbox" onClick={this.handleClick} checked={this.state.checked} id="show-menu" role="button" onChange={this.onChange}></input>
					<ul id="menu">
						<li><a href="#">Home</a></li>
						<li>
							<a href="#">About &#65516;</a>
							<ul className="hidden">
								<li><a href="#">Who We Are</a></li>
								<li><a href="#">What We Do</a></li>
							</ul>
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
