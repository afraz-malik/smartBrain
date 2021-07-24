import React from 'react';

const Rank = ({username, rank}) =>{
	return(
		<div>
			<div className='white f3'>
				{`Hey ${username} You are Level:`}
			</div>
			<div className='white f1'>
				{`#${rank}`}
			</div>
		</div>	
	)
}
export default Rank;