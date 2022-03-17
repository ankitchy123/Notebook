const connectToMongo = require('./db');
const express = require('express');
const app = express()
var cors = require('cors')


app.use(cors())
const port = process.env.PORT || 5000
connectToMongo();
app.use(express.json());

// Available routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));

// if (process.env.NODE_ENV == "production") {
//     app.use(express.static("client/build"));
// }
app.listen(port, () => {
    console.log(`iNote backend listening on port http://localhost:${port}`);
})