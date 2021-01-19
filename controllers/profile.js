const handleProfileGet = (req, res, db) => { // dependency injection, passing 'db' profile.js from server.js
    const { id } = req.params; // capture id
    db.select('*').from('users') // connect to db users
    .where({ id }) // get data where user matches id only
    .then(user => {
        if (user.length) {
            res.json(user[0]) //reply back with matching user from id
            //console.log(user[0]); //check output
        } else {
            res.status(400).json('Not found') //show error message if no user found
        }
    })
    .catch(err => res.status(400).json('error getting user'))
}

module.exports = {
    handleProfileGet
};