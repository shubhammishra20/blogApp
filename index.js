import express from "express"

import authRoute from "./routes/auth.js"
import postRoute from "./routes/posts.js"
import userRoute from "./routes/users.js"
import cookieParser from "cookie-parser"
import multer from "multer"

const app = express()

//We should use express json function here, Otherwise we won't be able to send any data our DB.

app.use(express.json())
app.use(cookieParser())

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../client/public/upload')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now()+file.originalname)
  }
})

const upload = multer({ storage })

app.post('/api/upload', upload.single('file'), function (req, res) {
  const file = req.file
    res.status(200).json(file.filename)
  })

app.use('/api/auth', authRoute)
app.use('/api/posts', postRoute)
app.use('/api/users', userRoute)

app.listen(9800, ()=> {
    console.log('Connected')
})