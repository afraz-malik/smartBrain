const adminHandler = (req, res, db)=>{
	db.select('*').from('users').orderBy('id')
	.then(response => res.json(response))
	.catch(err => res.json(err))
}
module.exports = {
	adminHandler
}