const handleRegister = (req, res, db, bcrypt) =>{
	const {email, password,name} = req.body;
	const hash = bcrypt.hashSync(password);
	res.json('workings');
	db.select('*').from('users').where('email', '=', email).then(value=>{
		if(value.length != 0){
			res.status(400).json('already exist')
		}
		else{
			db.transaction(trx=>{
				trx.insert({
					hash: hash,
					email: email
				})
				.into('login')
				.returning('email')
				.then(LoginEmail=>{
					console.log(LoginEmail)
					return trx('users')
					.returning('*')
					.insert({
						name: name,
						email: LoginEmail[0],
						joined: new Date()
					})
					.then(response=>{res.json('success')})
				})
				.then(trx.commit)
			})
			.catch(err => res.json('unable to Register'))
			}
	})
}
module.exports={
	handleRegister
}