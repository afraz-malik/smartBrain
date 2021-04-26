const profileHandler = (req, res)=>{
	const {id} = req.params
	db.select('*').from('users').where({id})
		.then(response => res.json(response))
		.catch(err => res.json(err))
}
module.exports={
	profileHandler
}