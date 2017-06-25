import React from 'react'
import './foodItemModal.scss'
import FullscreenDialog from 'material-ui-fullscreen-dialog'
import classNames from 'classnames';
import FoodItem from 'components/FoodItem'
import createReactClass from 'create-react-class'
import PropTypes from 'prop-types';
import FlatButton from 'material-ui/FlatButton';

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
    return <FullscreenDialog
            open={foodItemModalOpen}
            onRequestClose={this.closeModal}
            actionButton={<FlatButton
              label='Done'
              onTouchTap={() => this.closeModal()}
            />}
           >
            <div>
              <FoodItem foodItemId={foodIdSelected}/>
            </div>
          </FullscreenDialog>
  }
})


export default FoodItemModal
