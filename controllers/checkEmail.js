
const checkEmail =(req, res, pg, bcrypt)=> {
	
	const {email} = req.body

	pg('users')
	.select('email')
	.where({email: email})
	.then(email => {
		!email[0] ? insertUser(req, res, pg, bcrypt)
		:
		res.json(email[0])
	})
	.catch(error => {
		res.status(400).json('Something went wrong while checking the email.')
	})
}

const insertUser =(req, res, pg, bcrypt)=> {

	const {first_name, last_name, email, password} = req.body	
	const encrypted = bcrypt.hashSync(password)

	pg('users')
	.insert({
		first_name: first_name,
		last_name: last_name,
		email: email,
		password: encrypted,
		date_created: new Date()
	})
	.then(user => {
		res.status(200).json('User created.')
	})
	.catch(error => {
		res.status(400).json('Could not insert user.')
	})
}
module.exports = {checkEmail: checkEmail}