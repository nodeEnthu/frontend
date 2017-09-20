import React from 'react';
import './flatSelection.scss';
import createReactClass from 'create-react-class'
import PropTypes from 'prop-types';

const FlatSelection = createReactClass({
  getInitialState() {
    return  {
      selections:this.props.selections,
      style:this.props.style,
      checked:this.props.defaultChecked ,
      classname:this.props.classname,
      onClick:this.props.onClick,
      storeKey:this.props.storeKey,
      actAsButton:this.props.actAsButton || false
    }
  },
  componentWillReceiveProps(nextProps) {
  },
  selectionChanged(e){
    // what is currently checked
    let currentlyCheckedItem= this.state.checked;
    let newlyCheckedItem = e.currentTarget.value;
    if (!this.state.actAsButton){
      if(currentlyCheckedItem ===newlyCheckedItem){
        newlyCheckedItem=undefined
      }
    }
    
    this.setState({
      checked: newlyCheckedItem
    });
    this.state.onClick(e.currentTarget.value,this.state.storeKey);
  },
  render(){
    const {selections,style,checked,classname,storeKey} = this.state;
    let self=this;
    return(
      <div style={style} className={classname}>
        <group className="inline-radio">
          {
            selections.map(function(selection,index){
              return <div key={index}>
                        <input  type="radio" 
                                name={selection.title}
                                value={selection.value}
                                checked={selection.value === checked}
                                onClick={self.selectionChanged}
                        />
                          <label>{selection.title}</label>
                      </div>
            })
          }
        </group>
      </div>
      )
  }
})

FlatSelection.propTypes = {
  style:PropTypes.object,
  selections:PropTypes.array
}

export default FlatSelection;
