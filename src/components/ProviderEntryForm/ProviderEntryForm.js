import React, {Component, PropTypes} from 'react';
import classes from './providerentryform.scss'
const maxCount = 300;

class ProviderEntryForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            chars_left: maxCount,
            titile:'great company here',
            background:'',
            streetName:'',
            crosStreetName:'',
            city:'',
            emailId:''
        };
    }
    handleChange(event) {
        let input = event.target.value;
        this.setState({
            chars_left: maxCount - input.length
        })
    }
    _handleSubmit(event){
    	event.preventDefault();
    }
    render() {
        let { chars_left,title,background,streetName,crosStreetName,city,emailId } = this.state;
        return (
        	
	        <form id="provider-form" className="pure-form">
	         	<fieldset className="pure-group">
			        <input type="text"  placeholder="title (required)" value={title}/>
			        <textarea className="pure-input-1" placeholder="Background (optional)"></textarea>
			    </fieldset>
			    
			    
			    <div className = {classes["pull-left"]}>
			    	<div className ={classes["display-inline"]} style = {{position:'relative', top:'-7px'}}>Display your neighborhood address on map</div>
			    		<input type="checkbox"/>
				
			    </div>
			    <fieldset className="pure-group">
			        <input type="text"  placeholder="Street Name (optional)" />
			        <input type="text"  placeholder="Cross Street Name (optional)"/>
			        <input type="text"  placeholder="City (required)"/>
			    </fieldset>

			    <div className = {classes["pull-left"]}>
			    	<div className ={classes["display-inline"]} style = {{position:'relative', top:'-7px'}}>Keep my email id private</div>
			    	
			    		<input type="checkbox" />
					
			    </div>
			    <fieldset className="pure-group">
			        <input type="text"  placeholder="email (required)"/>
			    </fieldset>
			</form>
		
        )
    }
}
export default ProviderEntryForm;
