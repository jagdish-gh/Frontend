import React from 'react';
import Tilt from 'react-tilt'
import './Logo.css'
import Brain from './Brain.png'


const Logo = () =>{
	return(
		<div className='ma4 mt0'>
			<Tilt className="Tilt br2 shadow-2" options={{ max : 50 }} style={{ height: 75, width: 75 }} >
	 			  <div className="Tilt-inner pa3 "> 
	 			  	<img style={{paddingTop: '1px'}} alt ='Logo' src={Brain}/> 
	 			  </div>
			</Tilt>
			
		</div>
	);
}
export default Logo ; 