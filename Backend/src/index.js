import app from './app.js'
import {PORT} from './config.js'

//colocar la app en escucha
app.listen(PORT)
console.log("Serve on port: ",PORT)