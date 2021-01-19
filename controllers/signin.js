const handleSignin = (req, res, db, bcrypt) => { // dependency injection, passing 'db' and 'bcrypt' to signin.js from server.js

    // form validation
    const { email, password } = req.body; // destructuring, removes need to keep repeating req.body.xxx
    if (!email || !password) { // check if email OR name OR password are empty, if = true, responsd with error
      return res.status(400).json('incorrect form submission'); // return added to block further code execution if form fields empty is true
  }

    db.select('email', 'hash').from('login') // connect to login db table
        .where('email', '=', email) // get email from signin form
        .then(data => { 
            const isValid = bcrypt.compareSync(password, data[0].hash); // check if password from form matche bycrypt version in db
            if (isValid) { // true
              return db.select('*').from('users')
                .where('email', '=', email) // check user where email matches db in users
                .then(user => {
                  res.json(user[0])
                })
                .catch(err => res.status(400).json('unable to get user')) // if issue matching emails, give error
            } else {
              res.status(400).json('wrong credentials') // if not match give error
            }
        })
        .catch(err => res.status(400).json('wrong credentials'))
}

module.exports = {
    handleSignin: handleSignin
  };