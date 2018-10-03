import React from 'react';

const Navigation = ({onRouteChange, isSignIn}) =>{
	
		if(isSignIn){
			return(
		<nav style={{display:'flex',justifyContent:'flex-end'}}>
			<p 
			onClick={() => onRouteChange('Signout') }
			className='f3 link dim black underline pa3 pointer'> Sign Out </p>
		</nav>	);
		}
		else{
			return(
			<nav style={{display:'flex',justifyContent:'flex-end'}}>
			<p 
			onClick={() => onRouteChange('Signin') }
			className='f3 link dim black underline pa3 pointer'> Sign In </p>
			<p 
			onClick={() => onRouteChange('Registor') }
			className='f3 link dim black underline pa3 pointer'> Registor </p>
		
		</nav>
);
		}
	
}
export default Navigation ; 