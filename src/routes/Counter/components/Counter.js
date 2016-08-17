import React from 'react'
import Counter from 'components/Counter'
import {CUISINE_TYPES} from './../constants/searchFilters'
import Carousel from 'nuka-carousel'
import classes from './counter.scss'
const CounterWrapper = React.createClass({
	render(){
		return (
			<div>
				<Counter {...this.props}/>
				<Carousel
					slidesToShow={5}
					cellSpacing={10}
					dragging={true}
				>
					{CUISINE_TYPES.map((cuisine,index)=>{
						return <img className={classes["carousel-img"]} key={index} src={cuisine.src}></img>
					})}
				</Carousel>
			</div>
		);
	}
})

export default CounterWrapper