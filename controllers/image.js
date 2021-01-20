const Clarifai = require('clarifai'); // initialise api app with api key
const app = new Clarifai.App({ 
  apiKey: process.env.API_CLARIFAI // dynamic key value stored on Heroku servers for security. You can also replace this value with your own key from Clarifai too.
});
 
 const handleApiCall = (req, res) => {
  app.models
    .predict(Clarifai.FACE_DETECT_MODEL, req.body.input) // get body input
    .then(data => { 
      res.json(data);
    })
    .catch(err => res.status(400).json('unable to work with API')) // catch error
 }

    // HEADS UP! Sometimes the Clarifai Models can be down or not working as they are constantly getting updated.
   // A good way to check if the model you are using is up, is to check them on the clarifai website. For example,
   // for the Face Detect Mode: https://www.clarifai.com/models/face-detection
   // If that isn't working, then that means you will have to wait until their servers are back up. Another solution
   // is to use a different version of their model that works like: `c0c0ac362b03416da06ab3fa36fb58e3`
   // so you would change from:
   // .predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
   // to:
   // .predict('c0c0ac362b03416da06ab3fa36fb58e3', this.state.input)
   

const handleImage = (req, res, db) => { // dependency injection, passing 'db' to image.js from server.js
    const { id } = req.body; // capture id
    db('users').where('id', '=', id) // connect to db where id matches
    .increment('entries', 1) // increment entry value by +1
    .returning('entries') // return new entry value 
    .then(entries => { // 
        res.json(entries[0]); // reply with update entry value for user
    })
    .catch(err => res.status(400).json('unable to get entries'))
}

module.exports = {
  handleImage,
  handleApiCall
}