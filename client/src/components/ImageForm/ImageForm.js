import React from 'react';
import './ImageForm.css'

const ImageForm = ({onInput, onSubmit}) =>{
	return(
		<div className='ma4 mt0'>
			<p>
				{'This Image Detector will detect Face for you .. Give it a chance!!!'}
			</p>
			<div className='center'>
				<div className='form pa4 br3 shadow-5 center'>
					<input type='text' placeholder='Enter Image URL' className='f4 pa2 w-70 center' onChange={onInput}/>
					<button className='w-30 grow f4 ph3 pv2 dib white bg-light-purple' onClick={onSubmit}>Detect</button>
				</div>
			</div>			
		</div>
	)
}
export default ImageForm;