const express = require("express")
const app = express()
const cors = require("cors")

require("./server/config/mongoose.config")

app.use(cors(), express.json(), express.urlencoded({ extended: true }))

const Routes = require("./server/routes/project.routes")
Routes(app)

app.listen(8000, () => console.log("Listening to port 8000"))