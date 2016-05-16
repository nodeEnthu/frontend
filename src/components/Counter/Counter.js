import React from 'react'
import classes from './Counter.scss'
import PureRenderMixin from 'react/lib/ReactComponentWithPureRenderMixin';

export default class Counter extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    return (
        <div>
          <div>
            Counter:
            {' '}
            <span className={classes['counter--green']}>
              {this.props.counter.get('val')}
            </span>
          </div>
          <button className='btn btn-default' onClick={this.props.increment}>
            Increment
          </button>
          {' '}
          <button className='btn btn-default' onClick={this.props.doubleAsync}>
            Double (Async)
          </button>
        </div>
    );
  }
}; 

Counter.propTypes = {
  counter: React.PropTypes.object.isRequired,
  doubleAsync: React.PropTypes.func.isRequired,
  increment: React.PropTypes.func.isRequired
}
export default Counter
