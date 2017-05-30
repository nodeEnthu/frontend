import React from 'react'
import './foodItemModal.scss'
import Dialog from 'material-ui/Dialog';
import classNames from 'classnames';
import FoodItem from 'components/FoodItem'
import createReactClass from 'create-react-class'
import PropTypes from 'prop-types';

const FoodItemModal = createReactClass({
  
 contextTypes: {
    router: PropTypes.object.isRequired
  },
  closeModal(){
    this.props.openModal({storeKey:'foodItemModalOpen', openModal:false});
  },
  componentWillUnmount(){
    
  },
  render(){
    const {foodItemModalOpen,foodIdSelected} = this.props.stateProps.toJS();
    return <Dialog
            open={foodItemModalOpen}
            onRequestClose={this.closeModal}
            autoScrollBodyContent={true}
            style={{paddingTop:"0p"}}
            contentStyle={{paddingTop:'0px',width:'95%',top:"-250px"}}
            repositionOnUpdate={false}
            autoDetectWindowHeight={false}
           >
            <div>
              <FoodItem foodItemId={foodIdSelected}/>
            </div>
          </Dialog>
  }
})


export default FoodItemModal
