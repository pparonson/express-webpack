import path from "path"
import express from "express"

const HTML_FILE = path.join(__dirname, "index.html")
const PORT = process.env.PORT || 8080

const app = express()

app.use(express.static(__dirname))

app.get("*", (req, res) => {
  res.sendFile(HTML_FILE)
})

app.listen(PORT, () => console.log(`Server is listening on PORT: ${PORT}`))
