import React from 'react';
import createReactClass from 'create-react-class'
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import {METHODS_OF_PAYMENT} from 'components/ProviderEntryForm/constants'


const ProviderSummaryCard = createReactClass({
	getInitialState() {
		return{
			activeLink:'invite',
			jobDetails:'',
			disabledInvites:[]
		};
	},
	resolveMethodsOfPayment(methodsOfPayment){
		let paymentMethods = [];
		if(methodsOfPayment){
	        methodsOfPayment.map(function(methodOfPayment,index){
	          METHODS_OF_PAYMENT.forEach(function(constPaymentMethods){
	            if(constPaymentMethods.value === methodOfPayment){
	              paymentMethods.push(constPaymentMethods.label);
	            }
	          })
	        })
      	}
      	return paymentMethods;
	},
  	render(){
  		const {provider} = this.props;
  		let self = this;
	    return (
	    <div>
	    	 <div style={{paddingTop:'0.5em', paddingBottom:'0'}}>
						          {provider.description}
	        </div>
	        <div style={{paddingTop:'0.5em', paddingBottom:'0'}}>
	        	<div className="pure-u-1-3">
	                  {
	                    (provider.serviceOffered === 1)?
	                      <span className="service-offered">{' Offers Pickup'}</span>
	                      :''
	                  }
	                  {
	                    (provider.serviceOffered === 2)?
	                      <span className="service-offered">{' Pickup and Delivery'}</span>
	                      :''
	                  }
	                  {
	                    (provider.serviceOffered === 3)?
	                      <span className="service-offered">{' Offers Delivery'}</span>
	                      :''
	                  }
	            </div>
	            {
	            	(provider.distance || provider.distance === 0.00)?
	            	<div className='pure-u-1-3'>
		            	{ provider.distance.toFixed(2) +' km away'}
		            </div>
		            :
		            undefined
	            }
	            
	            {/*<div className='pure-u-1-3'>
	            	{self.resolveMethodsOfPayment(provider.methodsOfPayment).join(',')}
	            </div>*/}
	            <div className='pure-u-1-3'>
	            	{ provider.phone}
	            </div>
	        </div>
	    </div>)
  }
})

ProviderSummaryCard.propTypes = {
	provider:PropTypes.object
}
export default ProviderSummaryCard;