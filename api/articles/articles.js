const { response } = require("express");
const express = require("express");

const router = express.Router();

const wiki = require('./articles.json');
const validArticle = require('../validation');
//GET ALL ARTICLES
router.get('/',(req,res) =>{
  res.status(200).json(wiki);
  
});


//POST NEW ARTICLE
router.post('/', (req,res)=>{
  
  const { error } = validArticle.validateArticles(req.body);

  if(error){
    return res.status(400).send("Name should be 3 chars long and Description should be 10 chars long");
  }

  const postArticle = {
    "id":wiki.length + 1,
    "name":req.body.name,
    "desc":req.body.desc
  };
  wiki.push(postArticle);
  res.status(201).send("Article added");
});

//GET ARTICLE BY ID
router.get('/:name',(req,res)=>{
  
  const foundArticle = wiki.find(( article ) => article.name === req.params.name );
  if(foundArticle){
    res.send(foundArticle);
  }else{
    res.status(404).send("No article found");
  }
});

//PUT - MAKE CHANGES IN ARTICLE
router.put('/:name', (req,res)=>{

  const { error } = validArticle.validateArticles(req.body);
  if(error){
    return res.status(400).send("Name should be 3 chars long and Description should be 10 chars long");
  }
  const foundArticle = wiki.find( (article) => article.name === req.params.name );

  if(foundArticle){
    foundArticle.desc = req.body.desc;
    res.send(foundArticle);
  }
  else{
    //res.status(404).send("No article found");
    const newArticle = {
      id:wiki.length + 1,
      name:req.params.name,
      desc:req.body.desc
    };
    wiki.push(newArticle);
    res.status(201).send("New article created");
  } 
});

module.exports =  router;
