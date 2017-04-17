import React from 'react';
import './stepper.scss';

const Stepper = React.createClass({
  getInitialState() {
    let steps = [];
    for(var i=0;i < this.props.numberofSteps ; i++){
      steps.push(i);
    }
    return {
      steps:steps,
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
              return <div key={index} style={{display:'inline-block'}}>
                      <div className={((index+1) === activeStep)? 'step active':'step'}>
                        <div className="step-icon">{index+1}</div>
                        <div className="label">{'Step '+(step+1)}</div>
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
  numberofSteps:React.PropTypes.number.isRequired,
  activeStep: React.PropTypes.number.isRequired,
  style:React.PropTypes.object,
  className:React.PropTypes.string
}

export default Stepper;
