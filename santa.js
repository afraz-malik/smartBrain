
// ( means 1 step upwards
// ) means 1 step downwards

const fs= require('fs');
fs.readFile('./santa.txt', (err, data)=>{
	console.time('SANTA_GAME');
	if(err){
		console.log('error');
	}
	const directions = data.toString();
	const directionsArray = directions.split('')
	var flow=0;
	var move;
	for (var i = 0 ; i <=  directionsArray.length; i++){
		if(directionsArray[i]==='('){
			move = flow++;
			// console.log('up',flow);
		}
		if(directionsArray[i]===')'){
			move = flow--;
			// console.log('down', flow)
		}
		if(flow === -1){
			console.log('hit', i+1);
			// break;
		}
	}
	console.log('flow', flow)
	// const answer=directionsArray.reduce((acc, currentValue)=>{
	// 	if(currentValue=='(')
	// 		return acc += 1
	// 	else if(currentValue == ')')
	// 		return acc -= 1
	// },0)
	// console.log('answer', answer)
	console.timeEnd('SANTA_GAME');
})