import React from 'react'
import './CoreLayout.scss'
import '../../styles/core.scss'
import Header from '../../components/Header/index'
import PropTypes from 'prop-types';

export const CoreLayout = ({ children }) => (
  <div className='container'>
  	<Header/>
    <div className='content'>
      {children}
    </div>
    <div className="pure-g footer">
        <div className="pure-u-md-4-5 pure-u-1">
        <div className="pure-menu pure-menu-horizontal">
          <ul>
              <li className="pure-menu-item"><a href="/termsandconditions" className="pure-menu-link">Terms and conditions</a></li>
              <li className="pure-menu-item"><a href="mailto:support@calljack-ie.com" className="pure-menu-link">Contact-us</a></li>
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