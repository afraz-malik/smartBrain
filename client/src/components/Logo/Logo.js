import React from 'react';
import Tilt from 'react-tilt'
import './Logo.css'
import Brain from './brain.png'
const Logo = () =>{
	return(
		<div className='ma4 mt0'>
		<Tilt className="Tilt br2 shadow-2" options={{ max : 25 }} style={{ height: 140, width: 150, }}>
		 	<div className="Tilt-inner pa3">
		 		<img alt='' src={Brain} /> 
			</div>
		</Tilt>

		</div>
	)
}
export default Logo;