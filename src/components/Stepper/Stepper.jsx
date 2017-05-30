import React from 'react';
import './stepper.scss';
import createReactClass from 'create-react-class'
import PropTypes from 'prop-types';

const Stepper = createReactClass({
  getInitialState() {
    return {
      steps:this.props.steps,
      activeStep:this.props.activeStep,
      className:this.props.className,
      style:this.props.style
    }
  },
  selectionChanged(e){
   
  },
  render(){
    const {steps,activeStep,style,className} = this.state;

    return(
      <div className="stepper">
        
          {
            steps.map(function(step,index){
              let complete = ((index+1)< activeStep)? true: false;
              const icon = (complete)? '' : index+1;
              return <div key={index} style={{display:'inline-block'}}>
                      <div className={((index+1) === activeStep)? 'step active':(complete)?'step complete':'step'}>
                        <div className={((index+1) === activeStep)? 'step-icon':(complete)?'step-icon fa fa-check':'step-icon'}>{icon}</div>
                        <div className="label">{step.label}</div>
                      </div>
                      {
                        (index < (steps.length-1))?
                          <div className="divider"></div>
                          :
                          undefined
                      }
                        
              
                    </div>      
            })
          }
      </div>
      )
  }
})

Stepper.propTypes = {
  steps:PropTypes.array.isRequired,
  activeStep: PropTypes.number.isRequired,
  style:PropTypes.object,
  className:PropTypes.string
}

export default Stepper;
