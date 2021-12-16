const express = require("express");
const cors = require('cors');
const path = require('path');
const ArticleRoutes = require( './articles/articles.js');
const bodyParser = require("body-parser");
const app = express();
app.use(cors());

app.use(bodyParser.json());
app.use('/articles', ArticleRoutes);
app.use(express.static(path.join(__dirname, '../my-app/build')));
app.get('/*', (req,res) => {
    res.sendFile(path.join(__dirname, '../my-app/build/index.html'));
});

const port = process.env.PORT || 9090;

app.listen(port, ()=>console.log(`Server Started..`));

module.exports = app;