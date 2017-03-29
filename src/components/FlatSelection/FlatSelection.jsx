import React from 'react';
import './flatSelection.scss';

const FlatSelection = React.createClass({
  getInitialState() {
    return  {
      selections:this.props.selections,
      style:this.props.style,
      checked:this.props.defaultChecked
    }
  },
  selectionChanged(e){
    this.setState({
      checked: e.currentTarget.value
      });
  },
  render(){
    const {selections,style,checked} = this.state;
    let self=this;
    return(
      <div style={style}>
        <group className="inline-radio">
          {
            selections.map(function(selection,index){
              return <div key={index}>
                        <input  type="radio" 
                                name={selection.title}
                                value={selection.value}
                                checked={selection.title === checked}
                                onChange={self.selectionChanged}
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
  style:React.PropTypes.object,
  selections:React.PropTypes.array
}

export default FlatSelection;
