const mongoose = require('mongoose')

if (process.argv.lengh < 3) {
  console.log('Give password as argument')
  process.exit
}

const password = process.argv[2]

const url = `mongodb+srv://mtyh:${password}@cluster0.cg5hajx.mongodb.net/noteApp?appName=Cluster0`

mongoose.set('strictQuery', false)
mongoose.connect(url, { family: 4 })

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

Note.find({}).then((result) => {
  result.forEach((note) => {
    console.log(note)
  })
  mongoose.connection.close()
})
