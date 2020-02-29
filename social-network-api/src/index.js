import express from 'express'
import btoa from 'btoa'

const app = express()

// respond with "hello world" when a GET request is made to the homepage
app.get('/', function (req, res) {
  res.send('hello world')
})

app.listen(3000, () => {

  console.log(`Server is running on PORT: ${3000} `) // mv later todo
})
