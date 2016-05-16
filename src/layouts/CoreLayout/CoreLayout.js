import React from 'react'
import classes from './CoreLayout.scss'
import '../../styles/core.scss'
import HomeContainer from '../../routes/Home/containers/HomeContainer'
 
export const CoreLayout = ({ children }) => (
  <div className='container'>
  	<HomeContainer/>
    <div className={classes.mainContainer}>
      {children}
    </div>
  </div>
)

CoreLayout.propTypes = {
  children: React.PropTypes.element.isRequired
}

export default CoreLayout
