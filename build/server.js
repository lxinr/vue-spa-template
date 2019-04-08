
const express = require('express')
const app = express()
const PORT = 3001
// Serve the files on port 3001.
app.get('/', (req, res) => {
  res.send(`app listening on port ${PORT}!\n`)
})

app.listen(PORT)
console.log('服务器已启动-----', 'http://localhost:' + PORT)