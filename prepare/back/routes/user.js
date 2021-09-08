const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');

const { User, Post } = require('../models');
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

module.exports = router;
