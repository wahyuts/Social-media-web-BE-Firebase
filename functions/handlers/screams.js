const { db } = require('../util/admin')

exports.getAllScream = (req,res) => { // pakai fungsi app.get jika menggunakan express
    db
      .collection(`screams`)  // collection adalah tabel nya kalo di database
      .orderBy('createdAt', 'desc')  // orderBy adalah semacam perintah sort
      .get() // get adalah perintah untuk dapetin data
      .then(data => { // promise nya
        let screams = [];
         data.forEach(doc => {
           screams.push({ 
             screamId: doc.id,
             body: doc.data().body,
             userHandle: doc.data().userHandle,
             createdAt: doc.data().createdAt
           })
         })
         return res.json(screams);
      })
      .catch(err => console.error(err));
  }

  exports.postOneScream = (req,res) => { 

    if(req.body.body.trim() === ''){
      return res.status(400).json({ body: "Body must not be empty"})
    }
    const newScream = {
      body: req.body.body,  // body pertama adalah parameter body createScream, body kedua adalah statement bodynya si req, body ketiga adalah property dari bodynya si req
      userHandle: req.user.handle, // maksud nya sama kek yang diatas cuma ini userHandle
      // createdAt: admin.firestore.Timestamp.fromDate(new Date())  gunakan code firestore.Timestamp jika ingin tanggal dari firebase 
      createdAt: new Date().toISOString() // pake code ini karena lebih friendly javascript
    }
  
    db
      .collection(`screams`)
      .add(newScream)
      .then(doc => {
          res.json({ message: `document ${doc.id} created successfully`}) // message disini properti dari json object
      })
      .catch(err => {
          res.status(500).json({error: `something went wrong`}); // error disini properti dari json object
          console.error(err);
      })
  }