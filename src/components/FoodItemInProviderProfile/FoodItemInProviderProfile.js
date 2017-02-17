import React from 'react'
import './foodItemInProviderProfile.scss'
import RaisedButton from 'material-ui/RaisedButton';
import StarRatingComponent from 'react-star-rating-component';
import { Link } from 'react-router';
import moment from 'moment';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import {timeOfDay,resolvePickUpTime} from 'components/FoodItemEntryForm/constants';


const FoodItemInProviderProfile = React.createClass({
  deleteFoodItem(id){
    let self = this;
    this.props.postSecuredData('/api/foodItem/'+id+'/remove','removeItem','REMOVE_ITEM')
    .then(function(){
      self.props.refreshPage();
      self.props.openModal({storeKey:'deleteItemModalOpen', openModal:false})
    })
  },
  render(){
    let {foodItem,mode}= this.props;
    const {deleteItemModalOpen} = this.props.providerProfile.toJS() || false;
    const availabilityLength = foodItem.availability.length;
    let editOrReOffer=(this.props.pastItem === true)? 'Offer Again': 'Edit';
    return <section className="post">
            <div>
              <div className="post-avatar pure-u-md-2-5">
                <header className="post-header">
                  <h2 style={{display:'inline-block'}}>{foodItem.name}</h2>
                  <div
                    style={{display:'inline-block', padding:'0 0.5em'}}
                  >
                    <StarRatingComponent
                      name={foodItem._id} 
                      editing={false}
                      starCount={5}
                      value={parseInt(foodItem.rating)}
                    />
                  </div>
                  <Link to={'/foodItem/'+foodItem._id+'/reviews'} style={{display:'inline-block'}}>
                    {foodItem.numOfReviews+ ' reviews'}
                  </Link>
                </header>
                {
                  (this.props.userViewingOwnProfile)?
                    <div className={(this.props.pastItem?"move-right":"")}>                   
                      <Link to={'/foodItems/'+foodItem._id+'/edit'}>{editOrReOffer}</Link>
                      {
                        (mode != 'PROVIDER_ENTRY')?
                          <button style={{marginLeft:"1em"}} onClick={()=>this.props.openModal({storeKey:'deleteItemModalOpen', openModal:true})}>{"delete"}</button>
                          :
                          undefined 
                      }
                    </div>
                    :
                    undefined
                }
                <img alt={foodItem.name} className = {"food-item "+(this.props.pastItem?"past-food-item":"")} src={foodItem.imgUrl}/>
                {
                  (foodItem.enableReview)?
                    <div className="move-center review-submit-link"
                      onClick={()=>this.props.writeReviewModal(foodItem)}>
                      Please submit a review
                    </div>
                    :
                    undefined
                }
              </div>
              <div className="pure-u-md-3-5">
                <div className="post-description">
                    <p style={{marginTop:'1.5em'}}>{foodItem.description}</p>
                    <table className="pure-table remove-border">
                      <tbody>
                          <tr>
                              <td className="reduce-padding"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z"/></svg></td>
                              <td className="item-details">order</td>
                              <td className="item-details">{new Date(foodItem.placeOrderBy).toDateString()}</td>                           
                          </tr>
                          <tr>
                              <td className="reduce-padding"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg></td>
                              <td className ="item-details">ready-date</td>
                              <td className = "item-details">{foodItem.availability.map(function(date,index){
                                if(availabilityLength != (index+1)){
                                  return moment(date).format("dd, MMM Do")+' | ';
                                }else return moment(date).format("dd, MMM Do");
                                
                              })}</td>
                          </tr>
                          <tr>
                              <td className="reduce-padding">
                                <svg fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"/>
                                  <path d="M0 0h24v24H0z" fill="none"/>
                                </svg>
                              </td>
                              <td className = "item-details">price</td>
                              <td className = "item-details">{foodItem.price +' $'}</td>
                          </tr>
                          <tr>
                              <td className="reduce-padding"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm4.2 14.2L11 13V7h1.5v5.2l4.5 2.7-.8 1.3z"/></svg></td>
                              <td className ="item-details">pick-up</td>
                              <td className = "item-details">{resolvePickUpTime(foodItem.pickUpStartTime)} - {resolvePickUpTime(foodItem.pickUpEndTime)}</td>
                          </tr>
                      </tbody>
                  </table>
                </div>
              </div>
              {(this.props.mode != 'providerEntry' && !this.props.userViewingOwnProfile && !this.props.pastItem )?
                <RaisedButton
                  labelPosition="before"
                  label="Add to the cart" primary={true}
                  style={{display:"block"}}
                  onClick={(event)=>this.props.checkOutItem(event,foodItem)}
                  disableTouchRipple={true}
                >
                </RaisedButton>
                :
                undefined
              } 
            </div>
            {
              (mode != 'PROVIDER_ENTRY')?
                <Dialog
                  open={deleteItemModalOpen}
                  onRequestClose={()=>this.props.openModal({storeKey:'deleteItemModalOpen', openModal:false})}
                >
                <div style={{textAlign:"center"}}>
                  <p>
                    Are you sure you want to delete ... <span style={{fontWeight:"bold"}}>{" "+ foodItem.name}</span>
                  </p>
                  <p>
                    You will loose all your data including the reviews !!
                  </p>
                  <div>
                      <FlatButton label="Cancel"
                          onClick={()=>this.props.openModal({storeKey:'deleteItemModalOpen', openModal:false})}
                      />
                      <FlatButton 
                        backgroundColor="red" 
                        label="Delete" 
                        onClick={(event)=>this.deleteFoodItem(foodItem._id)}
                      />
                  </div>
                </div>
               </Dialog>
                :
                undefined 
            }
           
          </section>   
  }
})


export default FoodItemInProviderProfile
