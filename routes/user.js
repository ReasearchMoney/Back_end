const express = require('express');
const { Post,Follow } = require('../models');
const { isLoggedIn } = require('./middlewares');
const User = require('../models/user');
const db = require('../models');

const router = express.Router();

router.post('/:id/follow', isLoggedIn, async (req, res, next) => {
  try {
    const post = await Post.findOne({ where: { id: req.params.id } });
    if (post) {
      await post.addFollowing(parseInt(req.user.id , 10));
      res.send('success');
    } else {
      res.status(404).send('no user');
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.post('/delete/:id', isLoggedIn, async (req, res, next) => {


   try {
    const post = await Post.findOne({ where: { id: req.params.id } });
    if (post) {
      await post.removeFollowing(parseInt(req.user.id , 10));
      res.send('success');
    } else {
      res.status(404).send('no user');
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
  
});

router.get('/:id/follow', async (req, res, next) => {
  try {
    const post = await User.findAll({
      
      where: {
        id: req.params.id,
      },
      include: {
        model: Post,
        as: 'Followers',
       
      }
    });
    console.log('post',post)
    
   return res.json({
      research: post
        });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;