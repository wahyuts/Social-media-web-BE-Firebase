const functions = require("firebase-functions");
const app = require('express')();

const FBAuth =require('./util/fbauth')

const { getAllScream,postOneScream} = require('./handlers/screams')
const { signup,signin} = require('./handlers/users')


// Scream Routes
app.get('/screams', getAllScream)
app.post('/screams', FBAuth, postOneScream)

//Sign up Route

app.post('/signup', signup)

//Sign In Route

app.post('/signin', signin)


exports.api = functions.region('asia-southeast1').https.onRequest(app) // gunakan chain .region jika ingin ganti server,..pilihan region ada di doc firbasenya
