const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
require('dotenv').config();

require('../back-end/db/dbconn.js')
const routes = require('./routes/routes.js');

const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(cors())
app.use(routes);

app.listen(5000, () => {
    console.log(`server started: port-5000`)
})

