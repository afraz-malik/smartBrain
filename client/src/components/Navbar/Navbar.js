import React from 'react';

const Navbar = ({onRouteChange, isSignedIn, route}) =>{
	return(
		<div>
			{
				route === 'home'
				?	<nav style={{display:'flex', justifyContent: 'flex-end'}}>
						<p className='f4 link black underline pointer dim pa2' onClick={()=> onRouteChange('signIn')} >Sign out</p>
					</nav>
				:	<nav style={{display:'flex', justifyContent: 'flex-end'}}>
						<p className='f4 link black underline pointer dim pa2' onClick={()=> onRouteChange('signIn')} >Sign in</p>
						<p className='f4 link black underline pointer dim pa2' onClick={()=> onRouteChange('register')} >Register</p>
					</nav>
			}
		</div>
		
		
	)
}
export default Navbar;