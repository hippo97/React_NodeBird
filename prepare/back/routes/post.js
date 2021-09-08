const express = require('express'); //import

const { Post, Image, Comment, User } = require('../models');
const { isLoggedIn } = require('./middlewares');

const router = express.Router();

router.post('/', isLoggedIn, async (req, res) => {
  //보기에는 저렇지만 POST /post
  try {
    const post = await Post.create({
      content: req.body.content,
      UserId: req.user.id,
    });
    const fullPost = await Post.findOne({
      where: { id: post.id },
      include: [
        { model: Image },
        { model: Comment },
        { model: User },
      ],
    });
    res.status(201).json(fullPost);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

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
        PostId: req.params.postId,
      });
      res.status(201).json(comment);
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
);

router.delete('/', (req, res) => {
  //보기에는 저렇지만 DELETE /post
  res.json({ id: 1 });
});

module.exports = router; // export
