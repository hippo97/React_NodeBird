const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');

const { Op } = require('sequelize');
const { User, Post, Image, Comment } = require('../models');
const {
  isLoggedIn,
  isNotLoggedIn,
} = require('./middlewares');

const router = express.Router();

router.get('/', async (req, res, next) => {
  // GET /user
  try {
    if (req.user) {
      const fullUserWithoutPassword = await User.findOne({
        where: { id: req.user.id },
        attributes: { exclude: ['password'] },
        include: [
          {
            model: Post,
            attributes: ['id'],
          },
          {
            model: User,
            as: 'Followings',
            attributes: ['id'],
          },
          {
            model: User,
            as: 'Followers',
            attributes: ['id'],
          },
        ],
      });
      res.status(200).json(fullUserWithoutPassword); // 사용자가 있다면 가져오고
    } else {
      res.status(200).json(null); // 없다면 null을 가져옴
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.get(
  '/followers',
  isLoggedIn,
  async (req, res, next) => {
    // GET /user/followers
    try {
      const user = await User.findOne({
        where: { id: req.user.id },
      });
      if (!user) {
        res
          .status(403)
          .send('존재하지 않는 사람입니다(팔로우 실패).');
      }
      const followers = await user.getFollowers({
        limit: req.query.limit,
      });
      res.status(200).json(followers);
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
);

router.get(
  '/followings',
  isLoggedIn,
  async (req, res, next) => {
    // GET /user/followings
    try {
      const user = await User.findOne({
        where: { id: req.user.id },
      });
      if (!user) {
        res
          .status(403)
          .send('존재하지 않는 사람입니다(팔로우 실패).');
      }

      const followings = await user.getFollowings({
        limit: req.query.limit,
      });
      res.status(200).json(followings);
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
);

router.get('/:userId', async (req, res, next) => {
  // GET /user
  try {
    const fullUserWithoutPassword = await User.findOne({
      where: { id: req.params.userId },
      attributes: { exclude: ['password'] },
      include: [
        {
          model: Post,
          attributes: ['id'],
        },
        {
          model: User,
          as: 'Followings',
          attributes: ['id'],
        },
        {
          model: User,
          as: 'Followers',
          attributes: ['id'],
        },
      ],
    });

    if (fullUserWithoutPassword) {
      const data = fullUserWithoutPassword.toJSON();
      data.Posts = data.Posts.length; // 개인정보 보호 차원
      data.Followers = data.Followers.length;
      data.Followings = data.Followings.length;
      res.status(200).json(data); // 사용자가 있다면 가져오고
    } else {
      res.status(404).json('존재하지 않는 사용자입니다.'); // 없다면 null을 가져옴
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.get('/:userId/posts', async (req, res, next) => {
  // GET /user/1/posts
  try {
    const where = { UserId: req.params.userId };
    if (parseInt(req.query.lastId, 10)) {
      // 초기 로딩이 아닐 때
      where.id = {
        [Op.lt]: parseInt(req.query.lastId, 10),
      };
    }
    const posts = await Post.findAll({
      where,
      limit: 10,
      order: [
        ['createdAt', 'DESC'],
        [Comment, 'createdAt', 'DESC'],
      ],
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
            },
          ],
        },
        {
          model: User, //좋아요 누른사람
          as: 'Likers',
          attributes: ['id'],
        },
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
      ],
    });
    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.post('/login', isNotLoggedIn, (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      console.error(error);
      return next(error);
    }
    if (info) {
      return res.status(401).send(info.reason);
    }
    return req.login(user, async (loginErr) => {
      if (loginErr) {
        console.error(loginErr);
        return next(loginErr);
      }
      const fullUserWithoutPassword = await User.findOne({
        where: { id: user.id },
        attributes: { exclude: ['password'] },
        include: [
          {
            model: Post,
            attributes: ['id'],
          },
          {
            model: User,
            as: 'Followings',
            attributes: ['id'],
          },
          {
            model: User,
            as: 'Followers',
            attributes: ['id'],
          },
        ],
      });
      return res.status(200).json(fullUserWithoutPassword);
    });
  })(req, res, next);
});

router.post('/logout', isLoggedIn, (req, res, next) => {
  req.logout();
  req.session.destroy();
  res.send('ok');
});

router.post('/', isNotLoggedIn, async (req, res, next) => {
  // POST /user/

  try {
    const exUser = await User.findOne({
      where: {
        // 조건
        email: req.body.email,
      },
    });
    if (exUser) {
      return res
        .status(403)
        .send('이미 사용중인 이메일 입니다.');
    }

    const hashedPassword = await bcrypt.hash(
      req.body.password,
      12 // 높을수록 보안이 세짐 대신 시간이 오래걸림
    );
    await User.create({
      email: req.body.email,
      nickname: req.body.nickname,
      password: hashedPassword,
    });

    res.status(201).send('ok');
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.patch(
  '/nickname',
  isLoggedIn,
  async (req, res, next) => {
    try {
      await User.update(
        {
          nickname: req.body.nickname,
        },
        {
          where: { id: req.user.id },
        }
      );
      res.status(200).json({ nickname: req.body.nickname });
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
);

router.patch(
  '/:userId/follow',
  isLoggedIn,
  async (req, res, next) => {
    // PATCH /user/1/follow
    try {
      const user = await User.findOne({
        where: { id: parseInt(req.params.userId, 10) },
      });
      if (!user) {
        res
          .status(403)
          .send('존재하지 않는 사람입니다(팔로우 실패).');
      }
      // 팔로우 하게되면 내가 그 사람의 팔로워가 되니까 그사람의 팔로워에 나를 추가하면 됨
      await user.addFollower(req.user.id);
      res
        .status(200)
        .json({ UserId: parseInt(req.params.userId, 10) });
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
);

router.delete(
  '/:userId/follow',
  isLoggedIn,
  async (req, res, next) => {
    // DELETE /user/1/follow
    try {
      const user = await User.findOne({
        where: { id: parseInt(req.params.userId, 10) },
      });
      if (!user) {
        res
          .status(403)
          .send('존재하지 않는 사람입니다(언팔로우 실패).');
      }

      //그 사람의 팔로워에서 나를 삭제
      await user.removeFollower(req.user.id);
      res
        .status(200)
        .json({ UserId: parseInt(req.params.userId, 10) });
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
);

router.delete(
  '/follower/:userId/',
  isLoggedIn,
  async (req, res, next) => {
    // DELETE /user/follower/1
    try {
      const user = await User.findOne({
        where: { id: parseInt(req.params.userId, 10) },
      });
      if (!user) {
        res
          .status(403)
          .send('존재하지 않는 사람입니다(언팔로우 실패).');
      }

      //그 사람의 팔로잉에서 나를 삭제 == 내 팔로워에서 그사람을 차단
      await user.removeFollowings(req.user.id);
      res
        .status(200)
        .json({ UserId: parseInt(req.params.userId, 10) });
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
);

module.exports = router;
