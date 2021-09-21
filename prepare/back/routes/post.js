const express = require('express'); //import
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const {
  Post,
  Image,
  Comment,
  User,
  Hashtag,
} = require('../models');
const { isLoggedIn } = require('./middlewares');

const router = express.Router();

try {
  fs.accessSync('uploads');
} catch (error) {
  console.log('uploads폴더가 없어서 생성했습니다.');
  fs.mkdirSync('uploads');
}

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, done) {
      done(null, 'uploads');
    },
    filename(req, file, done) {
      // 파일 중복을 방지하기 위한 처리
      const ext = path.extname(file.originalname); // 확장자 추출
      const basename = path.basename(
        file.originalname,
        ext
      ); //파일이름 추출
      done(
        null,
        basename + '_' + new Date().getTime() + ext
      ); // 파일이름날짜시간.확장자
    },
  }),
  limits: { fileSize: 20 * 1024 * 1024 }, // 20메가로 제한
});

router.post(
  '/',
  isLoggedIn,
  upload.none(),
  async (req, res, next) => {
    //보기에는 저렇지만 POST /post
    try {
      const hashtags = Array.from(
        new Set(req.body.content.match(/#[^\s#]+/g))
      );
      const post = await Post.create({
        content: req.body.content,
        UserId: req.user.id,
      });
      if (hashtags) {
        const result = await Promise.all(
          hashtags.map((tag) =>
            Hashtag.findOrCreate({
              where: { name: tag.slice(1).toLowerCase() },
            })
          )
        ); //findOrCreate의 결과는 [[해시태그1, true], [해시태그2, true]] 이런 모양이라서

        await post.addHashtags(result.map((v) => v[0])); // [0]째 인덱스를 참조하는 것
      }
      if (req.body.image) {
        if (Array.isArray(req.body.image)) {
          // 이미지를 여러 개 올리면 image: [1.jpg, 2.jpg]
          const images = await Promise.all(
            req.body.image.map((image) =>
              Image.create({ src: image })
            )
          );
          await post.addImages(images);
        } else {
          // 이미지를 하나만 올리면 image: 1.jpg
          const image = await Image.create({
            src: req.body.image,
          });
          await post.addImages(image);
        }
      }
      const fullPost = await Post.findOne({
        where: { id: post.id },
        include: [
          {
            model: Image,
          },
          {
            model: Comment,
            include: [
              {
                model: User, //댓글 작성자
                attributes: ['id', 'nickname'],
              },
            ],
          },
          {
            model: User, // 게시글 작성자
            attributes: ['id', 'nickname'],
          },
          {
            model: User, //좋아요 누른사람
            as: 'Likers',
            attributes: ['id'],
          },
        ],
      });
      res.status(201).json(fullPost);
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
);

router.post(
  '/images',
  isLoggedIn,
  upload.array('image'), // 한장만 쓸거면 single쓰면 됨
  async (req, res, next) => {
    // POST /post/images

    //console.log(req.files);
    res.json(req.files.map((v) => v.filename));
  }
);

router.post(
  '/:postId/comment',
  isLoggedIn,
  async (req, res) => {
    //보기에는 저렇지만 POST /post/postId(동적으로 바뀌는 부분)/comment
    try {
      const post = await Post.findOne({
        where: { id: req.params.postId },
      });

      if (!post) {
        return res
          .status(403)
          .send('존재하지 않는 게시글입니다.');
      }
      const comment = await Comment.create({
        content: req.body.content,
        PostId: parseInt(req.params.postId, 10),
        UserId: req.user.id,
      });
      const fullComment = await Comment.findOne({
        where: { id: comment.id },
        include: [
          {
            model: User,
            attributes: ['id', 'nickname'],
          },
        ],
      });

      res.status(201).json(fullComment);
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
);

router.post(
  '/:postId/retweet',
  isLoggedIn,
  async (req, res, next) => {
    // POST /post/1/retweet
    try {
      const post = await Post.findOne({
        where: { id: req.params.postId },
        include: [
          {
            model: Post,
            as: 'Retweet',
          },
        ],
      });

      if (!post) {
        return res
          .status(403)
          .send('존재하지 않는 게시글입니다.');
      }

      if (
        req.user.id === post.UserId ||
        (post.Retweet &&
          post.Retweet.UserId === req.user.id)
      ) {
        return res
          .status(403)
          .send('자신의 글은 리트윗 할 수 없습니다.');
      }

      const retweetTargetId = post.RetweetId || post.id;
      const exPost = await Post.findOne({
        where: {
          UserId: req.user.id,
          RetweetId: retweetTargetId,
        },
      });
      if (exPost) {
        return res.status(403).send('이미 리트윗했습니다.');
      }
      const retweet = await Post.create({
        UserId: req.user.id,
        RetweetId: retweetTargetId,
        content: 'retweet',
      });
      const retweetWithPrevPost = await Post.findOne({
        where: { id: retweet.id },
        include: [
          {
            model: Post,
            as: 'Retweet',
            include: [
              {
                model: User,
                attributes: ['id', 'nickname'],
              },
              {
                model: Image,
              },
            ],
          },
          {
            model: User,
            attributes: ['id', 'nickname'],
          },
          {
            model: User, // 좋아요 누른 사람
            as: 'Likers',
            attributes: ['id'],
          },
          {
            model: Image,
          },
          {
            model: Comment,
            include: [
              {
                model: User,
                attributes: ['id', 'nickname'],
              },
            ],
          },
        ],
      });
      res.status(201).json(retweetWithPrevPost);
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
);

router.put(
  '/edit/:postId',
  isLoggedIn,
  upload.none(),
  async (req, res, next) => {
    try {
      const postId = parseInt(req.params.postId, 10);
      console.log('postId: ', postId);
      const prevPost = await Post.findOne({
        where: { id: postId },
      });
      console.log('req.body: ', req.body);
      const prevHashtags = Array.from(
        new Set(prevPost.content.match(/#[^\s#]+/g))
      ); //기존 게시글의 해시태그들을 가져온다.

      const newHashtags = Array.from(
        new Set(req.body.content.match(/#[^\s#]+/g))
      ); //새로 등록할 게시글에서 해시태그를 추출한다.

      prevHashtags.map((v) => {
        const tag = newHashtags.find(v);
        if (!tags) {
          Hashtag.destroy({
            where: {
              name: v,
            },
          });
        }
      }); //기존 게시글의 해시태그 중 모든 게시글에서 사용되지 않고 새로 등록된 게시글에도
      // 없다면, 해당 해시태그를 데이터베이스에서 삭제

      if (newHashtags) {
        const result = await Promise.all(
          hashtags.map((tag) =>
            Hashtag.findOrCreate({
              where: { name: tag.slice(1).toLowerCase() },
            })
          )
        );
        await post.addHashtags(result.map((v) => v[0]));
      } // 새로운 해시태그는 중복없이 등록

      if (req.body.image) {
        if (Array.isArray(req.body.image)) {
          // 이미지를 여러 개 올리면 image: [1.jpg, 2.jpg]
          const images = await Promise.all(
            req.body.image.map((image) =>
              Image.create({ src: image })
            )
          );
          await post.addImages(images);
        } else {
          // 이미지를 하나만 올리면 image: 1.jpg
          const image = await Image.create({
            src: req.body.image,
          });
          await post.addImages(image);
        }
      } //이미지는 기존 이미지 중 새 게시글에는 없는 이미지 해시태그처럼 삭제 안함(보관)

      await Post.update({
        content: req.body.content,
        UserId: req.user.id,
      });
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
);

router.get('/:postId', async (req, res, next) => {
  // GET /post/1
  try {
    const post = await Post.findOne({
      where: { id: parseInt(req.params.postId, 10) },
      include: [
        {
          model: User,
          attributes: ['id', 'nickname'],
        },
        {
          model: Image,
        },
        {
          model: Comment,
          include: [
            {
              model: User,
              attributes: ['id', 'nickname'],
              order: [['createdAt', 'DESC']],
            },
          ],
        },
        {
          model: User, //좋아요 누른 사람
          as: 'Likers',
          attributes: ['id'],
        },
      ],
    });
    res.status(200).json(post);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.patch(
  '/:postId/like',
  isLoggedIn,
  async (req, res, next) => {
    // PATCh /post/1/like

    try {
      const post = await Post.findOne({
        where: { id: req.params.postId },
      });

      if (!post) {
        return res
          .status(403)
          .send('게시글이 존재하지 않습니다.');
      }

      await post.addLikers(req.user.id);
      res.json({ PostId: post.id, UserId: req.user.id });
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
);

router.delete(
  '/:postId/like',
  isLoggedIn,
  async (req, res, next) => {
    // DELETE /post/1/like
    try {
      const post = await Post.findOne({
        where: { id: req.params.postId },
      });

      if (!post) {
        return res
          .status(403)
          .send('게시글이 존재하지 않습니다.');
      }
      await post.removeLikers(req.user.id);
      res.json({ PostId: post.id, UserId: req.user.id });
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
);

router.delete(
  '/:postId',
  isLoggedIn,
  async (req, res, next) => {
    //보기에는 저렇지만 DELETE /post/1
    try {
      await Post.destroy({
        // 삭제 기능
        where: {
          id: req.params.postId,
          UserId: req.user.id,
        },
      });
      res
        .status(200)
        .json({ PostId: parseInt(req.params.postId, 10) });
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
);

module.exports = router; // export
