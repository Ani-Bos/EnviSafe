const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const crypto = require('crypto');
const mongoose = require('mongoose');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
// const methodOverride = require('method-override');
const filter=require('./middleware/filter')
const { mongo } = require('mongoose');
const Garbage = require('./models/Garbage');
const cors=require('cors')
const app = express();
const axios=require('axios')
// Middleware
app.use(bodyParser.json());
app.use(cors())

// Mongo URI
const mongoURI = 'mongodb://localhost:27017/syntaxerror';

// Create mongo connection
const conn = mongoose.createConnection(mongoURI);
mongoose.connect(mongoURI,()=>{
 console.log(" connected to mongo")
})
// Init gfs
let gfs;

conn.once('open', () => {
  // Init stream
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('uploads');
});

// Create storage engine
const storage = new GridFsStorage({
  url: mongoURI,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString('hex') + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: 'uploads'
        };
        resolve(fileInfo);
      });
    });
  }
});
const upload = multer({ storage });
app.use('/api/auth',require('./routes/auth'))
// @route GET /
// @desc Loads form
app.post('/api/garbage/getdata',filter,async(req,res)=>{
  try {
    const getall=await Garbage.find({user:req.user.id});
    res.json(getall);
  } catch (error) {
    console.log(error)
    res.status(500).send("internal server error");
  }
})
app.get('/api/garbage/getall', filter,(req, res) => {
  gfs.files.find({user:req.user.id}).toArray((err, files) => {
    if(err)
    return res.send(err)

      res.json({files: files });
    
  });
});
app.post('/api/graph/getall', filter,async(req, res) => {
 try {
  const getall=await Garbage.find({user:req.user.id})
  const getFile = fruit => {
    return getall[fruit];
   };

 const arr= getall.map(async(e,i)=>{
  const res= await getFile(i).createdAt
  return res;
  })
  const arr1=await Promise.all(arr)
 const arr2= getall.map(async(e,i)=>{
  const res= await getFile(i).weight
  return res;
  })
  const arr3=await Promise.all(arr2)
 const arr4= getall.map(async(e,i)=>{
  const res= await getFile(i).category
  return res;
  })
  const arr5=await Promise.all(arr4)
  res.json({time:arr1,weight:arr3,category:arr5})
  
 } catch (error) {
  console.log(error)
  res.status(500).send("Internal Server Error");
 }
});

// @route POST /upload
// @desc  Uploads file to DB
app.post('/api/garbage/upload',upload.array('file'),filter, async(req, res) => {
    try {

let sumweight=parseFloat(req.body.weight);
if(typeof(req.body.weight)==='object'){
  const initialValue = 0;
  sumweight = req.body.weight.reduce(
    (accumulator, currentValue) => accumulator + parseFloat(currentValue),
    initialValue
  );
}


console.log(typeof(sumweight))
const getFile = fruit => {
  return req.files[fruit];
 };
        let arrtemp=req.files
       const arr= arrtemp.map(async (file,i)=>{
               const res=await getFile(i).filename
               return res;
        })
        const arr1=await Promise.all(arr)

       

        const arr2= arrtemp.map(async (file,i)=>{
          const res=await getFile(i).id
          return res;
   })
   const arr3=await Promise.all(arr2)

        const garbage=await Garbage.create({
            user:req.user.id,
            category:req.body.category,
            weight:sumweight,
            filename:arr1,
            fileid:arr3
        })

        res.json({garbage})
    } catch (error) {
        console.log(error)
        res.status(500).send("Internal Server Error");
    }

});

// @route GET /files
// @desc  Display all files in JSON
app.get('/files',filter, (req, res) => {
  gfs.files.find({user:req.user.id}).toArray((err, files) => {
    // Check if files
    if (!files || files.length === 0) {
      return res.status(404).json({
        err: 'No files exist'
      });
    }

    // Files exist
    return res.json(files);
  });
});

// @route GET /files/:filename
// @desc  Display single file object
app.get('/files/:filename', (req, res) => {
  gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
    // Check if file
    if (!file || file.length === 0) {
      return res.status(404).json({
        err: 'No file exists'
      });
    }
    // File exists
    return res.json(file);
  });
});

// @route GET /image/:filename
// @desc Display Image
app.get('/image/:filename', (req, res) => {
  gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
    // Check if file
    if (!file || file.length === 0) {
      return res.status(404).json({
        err: 'No file exists'
      });
    }

    // Check if image
    if (file.contentType === 'image/jpeg' || file.contentType === 'image/png') {
      // Read output to browser
      const readstream = gfs.createReadStream(file.filename);
      readstream.pipe(res);
    } else {
      res.status(404).json({
        err: 'Not an image'
      });
    }
  });
});

// @route DELETE /files/:id
// @desc  Delete file
app.post('/files/:id', (req, res) => {
  gfs.remove({ _id: req.params.id, root: 'uploads' }, (err, gridStore) => {
    if (err) {
      return res.status(404).json({ err: err });
    }

    res.redirect('/');
  });
});

app.get('/download/:id', async (req, res) => {
  var id = req.params.id;
 

  gfs.files.findOne({ _id: mongo.ObjectId(id) }, (err, file) => {
      if (err) {
          // report the error
          console.log(err);
      } else {
          // detect the content type and set the appropriate response headers.
          let mimeType = file.contentType;
          if (!mimeType) {
              mimeType = mime.lookup(file.filename);
          }
          res.set({
              'Content-Type': mimeType,
              'Content-Disposition': 'attachment; filename=' + file.filename
          });

          const readStream = gfs.createReadStream({
              _id: id
          });
          readStream.on('error', err => {
              // report stream error
              console.log(err);
          });
          // the response will be the file itself.
          readStream.pipe(res);
          // res.send(file)
      }
  });
})
app.get('/view/:id', async (req, res) => {
  var id = req.params.id;
 

  gfs.files.findOne({ _id: mongo.ObjectId(id) }, (err, file) => {
      if (err) {
          // report the error
          console.log(err);
      } else {
          // detect the content type and set the appropriate response headers.
          let mimeType = file.contentType;
          console.log(mimeType)
          if (!mimeType) {
              mimeType = mime.lookup(file.filename);
          }
          res.set({
              'Content-Type': mimeType,
              // 'Content-Disposition': 'attachment; filename=' + file.filename
          });

          const readStream = gfs.createReadStream({
              _id: id
          });
          readStream.on('error', err => {
              // report stream error
              console.log(err);
          });
          // the response will be the file itself.
          readStream.pipe(res);
          // res.send(file)
      }
  });
})

const port = 5001;



app.listen(port, () => console.log(`Server started on port ${port}`));
