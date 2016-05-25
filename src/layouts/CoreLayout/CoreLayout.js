import React from 'react'
import classes from './CoreLayout.scss'
import '../../styles/core.scss'
import Header from '../../components/Header/index'
 
export const CoreLayout = ({ children }) => (
  <div className='container'>
  	<Header/>
    <div className={classes.mainContainer}>
      {children}
    </div>
  </div>
)

CoreLayout.propTypes = {
  children: React.PropTypes.element.isRequired
}

export default CoreLayout
