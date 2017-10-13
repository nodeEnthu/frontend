import React from 'react'
import './CoreLayout.scss'
import '../../styles/core.scss'
import Header from '../../components/Header/index'
import PropTypes from 'prop-types';
import Alert from 'react-s-alert';

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
              <li className="pure-menu-item"><a href="/termsandconditions" className="pure-menu-link">Terms and conditions</a></li>
              <li className="pure-menu-item"><a href="mailto:support@spoonandspanner.com" className="pure-menu-link">Contact-us</a></li>
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