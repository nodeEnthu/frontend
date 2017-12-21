import React from 'react'
import './CoreLayout.scss'
import '../../styles/core.scss'
import Header from '../../components/Header/index'
import PropTypes from 'prop-types';
import Alert from 'react-s-alert';
import { Link, IndexLink } from 'react-router';

export const CoreLayout = ({ children }) => (
  <div className='container'>
  	<Header/>
    <Alert stack={{limit: 3}} />
    <div className='content'>
      {children}
    </div>
    <div className="footer-wrapper">
      <div className="footer">
        <div className="pure-menu pure-menu-horizontal">
          <ul className="pure-menu-list">
              <li className="pure-menu-item"><Link to="/termsandconditions" className="pure-menu-link">Terms and conditions</Link></li>
              <li className="pure-menu-item"><Link to="mailto:support@spoonandspanner.com" className="pure-menu-link">Contact-us</Link></li>
          </ul>
        </div>
      </div>
    </div>
  </div>
)

CoreLayout.propTypes = {
  children: PropTypes.element.isRequired
}

export default CoreLayout