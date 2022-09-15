const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const { Sub_todo,Todo, Hashtag } = require('../models');
const { isLoggedIn } = require('./middlewares');

const router = express.Router();
const upload2 = multer();
router.post('/', isLoggedIn, upload2.none(), async (req, res, next) => {
  try {
    
    console.log(req.body)
    console.log(req.user.id)
    const post = await Todo.create({
      todo: req.body.todo,
      // cost:req.body.cost,
      UserId: req.user.id,
    });
    // const post2 = await Sub_todo.create({
    //   todo: req.body.todo,
    //   // cost:req.body.cost,
    //   TodoId: 1,
    // });
    
   console.log('post respond')
    res.redirect('/indexpage');
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.get('/', async (req, res, next) => {
  try {
    console.log("api/post start")
    const posts = await Todo.findAll(
      {
        where: {
        UserId:1
        },
        include:[
        {
        model: Sub_todo,
        required: false
      }]
        
        
        
      }
      
    );
    console.log('backend posts')
    console.log(posts)
    return res.json({
      twits: posts
        });
  
  } catch (err) {
    console.log('api post fail')
    console.error(err);
    next(err);
  }
});



router.post('/delete/:id', isLoggedIn, upload2.none(), async (req, res, next) => {
  try {
    const post = await Post.destroy({
      where: {
        id: req.params.id,
      }
    });
   console.log('redirect')
  res.redirect('/indexpage');
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
