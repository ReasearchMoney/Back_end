const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const { Post, User,Hashtag } = require('../models');
const { isLoggedIn } = require('./middlewares');

const router = express.Router();
const upload2 = multer();
router.post('/', isLoggedIn, upload2.none(), async (req, res, next) => {
  try {
    
    console.log(req.body)
    console.log(req.user.id)
    const post = await Post.create({
      title: req.body.title,
      post: req.body.post,
      start_date_r: req.body.start_date_r,
      end_date_r: req.body.end_date_r,
      start_date: req.body.start_date,
      end_date: req.body.end_date,
      period: req.body.period,
      pay: req.body.pay,
      url: req.body.url,
      image: req.body.image,
      institution: req.body.institution,
      institution_name: req.body.institution_name,
      zone_1: req.body.zone_1,
      zone_2: req.body.zone_2,
      UserId: req.user.id,
    });
   
    
   console.log('post respond')
    res.redirect('/mypage');
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.get('/', async (req, res, next) => {
  try {
    const posts = await Post.findAll({
      include: {
        model: User,
        attributes: ['id', 'nickname'],
      },
      order: [['createdAt', 'DESC']],
    });
    console.log('backend posts')
    console.log(posts)
    return res.json({
      research: posts
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
