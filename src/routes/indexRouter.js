import express from 'express';
import isAuth from '../middlewares/isAuth';
import notAuth from '../middlewares/notAuth';
import { User, Post } from '../../db/models';
import adminCheck from '../middlewares/adminCheck';

const router = express.Router();

router.get('/', (req, res) => {
  res.render('Layout');
});

router.get('/signup', notAuth, (req, res) => {
  res.render('Layout');
});

router.get('/login', notAuth, (req, res) => {
  res.render('Layout');
});

router.get(
  '/students',
  isAuth,
  /* adminCheck, */ async (req, res) => {
    const students = await User.findAll();
    const initState = { students };
    res.render('Layout', initState);
  },
);

router.get('/posts', isAuth, async (req, res) => {
  const allPosts = await Post.findAll({
    include: ['User', 'likedBy'],
    order: [['createdAt', 'DESC']],
  });
  const initState = { allPosts };
  res.render('Layout', initState);
});

export default router;
