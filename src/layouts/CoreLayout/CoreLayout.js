import React from 'react'
import './CoreLayout.scss'
import '../../styles/core.scss'
import Header from '../../components/Header/index'
 
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
			      <li className="pure-menu-item"><a href="http://purecss.io/" className="pure-menu-link">About Us</a></li>
			      <li className="pure-menu-item"><a href="http://twitter.com/yuilibrary/" className="pure-menu-link">Press</a></li>
			      <li className="pure-menu-item"><a href="http://github.com/yahoo/pure/" className="pure-menu-link">Terms</a></li>
			      <li className="pure-menu-item"><a href="http://github.com/yahoo/pure/" className="pure-menu-link">Privacy</a></li>
			      <li className="pure-menu-item"><a href="http://github.com/yahoo/pure/" className="pure-menu-link">Contacts</a></li>
			  </ul>
			</div>
		</div>
	</div>
  </div>
)

CoreLayout.propTypes = {
  children: React.PropTypes.element.isRequired
}

export default CoreLayout