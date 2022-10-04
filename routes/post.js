const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const { Post, User,Hashtag,Book } = require('../models');
const { isLoggedIn } = require('./middlewares');

const router = express.Router();
const upload2 = multer();


// multer을 이용해 파일 업로드 기능 구현
var storage = multer.diskStorage({
    destination: function (req, file, cb) {	// 경로 => uploads 폴더
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {	// 파일명 => 이미지 업로드시 원본 이름 그대로
        cb(null, file.originalname);
    }
})
var upload = multer({ storage: storage });

// multer을 이용해 파일 업로드 기능 구현
// 글 작성 페이지에서 이미지를 올리면 실행되게 되는 부분
router.post('/imagesave', upload.array('filelist'), async (req, res, next) => {
  try {
    console.log("api success")
    // console.log(req.file[0].name)
    console.log(req.files)
    console.log(req.name)
    console.log(req.files.length)
    
   console.log(req.files[0].path)
            // fs.renameSync(req.files[0].path, 'uploads/'+Date.now()+'.png');
            // 위에서 이미지이름을 원본으로 저장해줬었는데 file system을 통해 이름을 바꿔주는 작업
        
  } catch (e) {
    console.log('image fail')
    console.log(e)
  }
});

// 전송된 formdata의 filelist에 해당하는 value 값들을 multer을 통해 저장
    // var i, newname;
    // db.content.findOne({	// 새 글 작성시 기존에 있던 가장 큰 id+1로 자동 저장됨으로 가장 큰 id를 찾아줌
    //     limit: 1,
    //     order: [['id', 'DESC']],
    //     raw:true,
    // }).then(result => {
    //     newname = result.id;
    //     for(i=0;i<req.files.length;i++) {
    //         fs.renameSync(req.files[i].path, 'uploads/'+(newname+1)+'-'+(i+1)+'.png');
    //         // 위에서 이미지이름을 원본으로 저장해줬었는데 file system을 통해 이름을 바꿔주는 작업
    //     }
    //     return res.status(200).json({message:'이미지업로드완료!'});
    // }).catch(err => {
    //     console.log(err);
    //     return res.status(404).json({message: '에러뜸'});
  
    // })
 
  
  


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
    res.redirect('/');
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
  return 
  } catch (error) {
    console.error(error);
    next(error);
  }
});
router.get('/:id', async (req, res, next) => {
  try {
    const post = await Post.findOne({
      
      where: {
        id: req.params.id,
      },
      include: {
        model: User,
        attributes: ['id', 'nickname'],
      }
    });
   console.log('post')
   return res.json({
      research: post
        });
  } catch (error) {
    console.error(error);
    next(error);
  }
});
router.get('/mypage/:id', async (req, res, next) => {
  try {
    const post = await Post.findAll({
      
      where: {
        UserId: req.params.id,
      },
      include: {
        model: User,
        attributes: ['id', 'nickname'],
      }
    });
   console.log('post')
   return res.json({
      research: post
        });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.post('/update/:id', isLoggedIn, upload2.none(), async (req, res, next) => {
  try {
    console.log(req.body.title)
    const post = await Post.update({
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
      
    },
    { where: { id: req.params.id } });
    console.log('redirect',post)
    
    console.log('post respond')
    return res.redirect("/")
   
  } catch (error) {
    console.error(error);
    next(error);
  }
});


router.post('/bookmark/:id', isLoggedIn, upload2.none(), async (req, res, next) => {
  try {
    const books = await Book.create({
      bookmark:req.params.id,
       UserId: req.user.id,
    });
    console.log('redirect')
    console.log('success')
    console.log(books)
  return 
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.get('/bookmark/:id', isLoggedIn, upload2.none(), async (req, res, next) => {
  
 try {
    const books = await Book.findAll({
      
      where: {
        UserId: req.params.id,
      }
     
    });
   console.log('bookmark')
   console.log(books);
   return res.json({
      research: books
        });
  } catch (error) {
    console.error(error);
    next(error);
  }

  
});


module.exports = router;
