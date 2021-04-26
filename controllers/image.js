const Clarifai = require('clarifai');
const api = new Clarifai.App({
  apiKey: '8237b3451119475ca139c72547515b41'
});


const imageHandler = (req, res, db)=>{
	db.returning('*').select('*').from('users').where('id', '=', req.body.id)
  		.increment('enteries', 1)
  		.then(response => res.json(response[0].enteries))
}
const apiHandler = (req, res) => {
	api.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
		.then(data=> res.send(data))
		.catch(err => res.status(400).json("Unable To Work with Api"))
}
module.exports={
imageHandler: imageHandler,
apiHandler: apiHandler
}