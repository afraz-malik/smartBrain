import React from 'react';
import './FaceDetectionBox.css'


const FaceDetectionBox = ({imageLink, box}) =>{
	return(
        
        <div className='center ma'>
           <div className='absolute  mt2'>
                <img id='faceimg' alt='' src={imageLink} width= '500px' height='auto'/>
                {
                    box.map((boxes,i) =>{
                       return (<FaceBox key={i} box={box[i]}/>  )   
                    })
                 
                }
            </div> 
        </div>
 

	)
}
const FaceBox = (box) =>{
    return(
        
        <div 
        className='boundingBox' 
        style={{
            top: box.box.topRow, 
            right: box.box.rightCol, 
            left: box.box.leftCol,  
            bottom: box.box.bottomRow                   
        }}  
        >
        </div>
    )
 

}
export default FaceDetectionBox;