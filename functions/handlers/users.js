const {db} = require ('../util/admin')

const firebaseConfig = require('../util/config')

const firebase = require('firebase');
firebase.initializeApp(firebaseConfig);

const { validateSignupData, validateSigninData } = require('../util/validator')

exports.signup = (req,res) => {
    const newUser = {
      email: req.body.email,
      password: req.body.password,
      confirmPassword: req.body.confirmPassword,
      handle: req.body.handle,
    }

    const {valid,errors} = validateSignupData(newUser);

    if(!valid) return res.status(400).json(errors);
  
    
  
    // TODO validate data
    let token, userId
    db.doc(`/users/${newUser.handle}`).get()
      .then(doc => {
        if(doc.exists){
          return res.status(400).json({ handle: 'this handle is already taken'});
        } else {
          return firebase
        .auth()
        .createUserWithEmailAndPassword(newUser.email, newUser.password)
        }
      })
      .then(data => {
        userId = data.user.uid;
        return data.user.getIdToken();
      })
      .then((idToken) => {
        token = idToken;
        const userCredentials = {
          handle: newUser.handle,
          email: newUser.email, 
          createdAt: new Date().toISOString(),
          userId
        };
        return db.doc(`/users/${newUser.handle}`).set(userCredentials)
        // return res.status(201).json({ token });
      })
      .then(() => {
        return res.status(201).json({token});
      })
      .catch(err => {
        console.error(err);
        if (err.code === "auth/email-already-in-use"){
          return res.status(400).json({email: "Email is already in use"})
        } else {
          return res.status(500).json({error: err.code})
        }
      })
  
  }

  exports.signin = (req,res) => {
    const user = {
      email: req.body.email, 
      password: req.body.password,
    }

    const {valid,errors} = validateSigninData(user);

    if(!valid) return res.status(400).json(errors);
  
    
  
    firebase.auth().signInWithEmailAndPassword(user.email, user.password)
      .then(data => {
        return data.user.getIdToken();
      })
      .then(token => {
        return res.json({token});
      })
      .catch(err => {
        console.error(err);
        if(err.code === "auth/wrong-password"){
          return res.status(403).json({ general : "wrong email or password"})
        } else if ( err.code === "auth/user-not-found"){
          return res.status(403).json({ general : "wrong email or password"})
        } else
        return res.status(500).json({error: err.code})
      })
  
  }