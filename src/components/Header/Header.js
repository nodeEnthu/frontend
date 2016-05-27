import React from 'react'
import { IndexLink, Link } from 'react-router'
import classes from './Header.scss'



  // var Header = React.createClass({
  //    getInitialState: function() {
  //     return {clicked: false};
  //   },
  //   handleClick: function(event) {
  //     this.setState({liked: !this.state.liked});
  //   },
  // })
export const Header = () => (

  <div className="header">
      <div className="home-menu pure-menu pure-menu-horizontal pure-menu-fixed">
          <a className="pure-menu-heading" href="">Your Site</a>
          <ul className="pure-menu-list">
              <li className="pure-menu-item pure-menu-selected">
                <IndexLink to='/' className="pure-menu-link">
                  Home
                </IndexLink>
              </li>
              <li className="pure-menu-item">
                
                  <Link to='/counter' className="pure-menu-link">Tour</Link>
              </li>
              <li className="pure-menu-item"><a href="#" className="pure-menu-link">Sign Up</a></li>
          </ul>
      </div>
  </div>
)

export default Header

