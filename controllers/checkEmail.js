//To send confirmation email.
const nodemailer = require('nodemailer')

//Check the database for duplicate email.
const checkEmail =(req, res, pg, bcrypt)=> {
	
	const {email} = req.body
	
	pg.from('users')
	.select('email')
	.where({email: email})
	.then(email => {		
		// If there is no email then the insertUser function is called.
		!email[0] ? insertUser(req, res, pg, bcrypt)
		:
		//If there is a duplicate email then the user exist.
		//The response would be to reset password on front end
		//and the response will be the existing email.
		res.json(email[0])
	})
	.catch(error => {
		res.status(400).json('Something went wrong while checking the email.')
	})
}

//Insert the user to the database.
const insertUser =(req, res, pg, bcrypt)=> {

	const {first_name, last_name, email, password} = req.body

	//Encrypt the user's password for extra security.	
	const encrypted = bcrypt.hashSync(password)

	pg('users')
	.returning(['email','id'])
	.insert({
		first_name: first_name,
		last_name: last_name,
		email: email,
		password: encrypted,
		date_created: new Date()
	})
	.then(user => {
		//After the insert the emailConfirmation function will be called next.
		emailConfirmation(req, res, pg, email)
		//If the insert is successful then a response with the email and id 
		//will be sent to the fron end as user.
		res.json(user[0].email)
	})
	.catch(error => Promise.reject(error))
}
//Send the email confirmation to the user
const emailConfirmation =(req, res, pg, email)=> {
  //Email transporter is where the email is being sent from.
  //This is an example using ethereal as a test service
  const transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  auth: {
    user: 'toby.watsica42@ethereal.email',
    pass: 'axYWGsraBjEExwD82C'
  }
})
 //Mail options to set up the actual message being sent. 
 mailOptions = {
  from: 'toby.watsica42@ethereal.email',
  to: email,
  subject: 'Sending Email using Node.js',
  text: 'That was easy!',
  html: `<p>Click <button><a href="http://localhost:3000/login">Confirm</a></button> to confirm your email address.</p>`
}
//Finally send the mail.
transporter.sendMail(mailOptions, (error, info)=> {
  	error ? console.log(error)
  	:
    console.log('Email sent: ' + info.response)
})
}

module.exports = {checkEmail: checkEmail}