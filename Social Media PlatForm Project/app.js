const express = require('express');
const connection = require('./config/config');
const advServer = require('./modules/Adv/routes/advRoutes');
const postServer = require('./modules/posts/routes/postRoutes');
const reportServer = require('./modules/Reports/routes/reportRoutes');
const app = express();
require("dotenv").config();
const server = require('./modules/users/routes/userRoutes')

app.use(express.json())

app.use(server)
app.use(postServer)
app.use(advServer)
app.use(reportServer)


connection();
app.listen(process.env.PORT, () => {
    console.log(`App listening on port ${process.env.PORT}!`);
});