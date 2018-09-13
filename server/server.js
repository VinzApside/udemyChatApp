const path = require("path");
const express = require('express');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
const app = express();

// app.get("/", (req, rep) => {
//      rep.send("hello")
//    });

app.use(express.static(publicPath))

app.listen(port, () => {
    console.log(`listening on port ${port}`)
})