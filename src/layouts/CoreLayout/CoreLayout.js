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
    <div className="footer">
		<div className="pure-menu pure-menu-horizontal">
		  <ul>
		      <li className="pure-menu-item"><a href="http://purecss.io/" className="pure-menu-link"></a></li>
		      <li className="pure-menu-item"><a href="http://twitter.com/yuilibrary/" className="pure-menu-link"></a></li>
		      <li className="pure-menu-item"><a href="http://github.com/yahoo/pure/" className="pure-menu-link"></a></li>
		  </ul>
		</div>
	</div>
  </div>
)

CoreLayout.propTypes = {
  children: React.PropTypes.element.isRequired
}

export default CoreLayout