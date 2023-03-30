import express from 'express';
import isAuth from '../middlewares/isAuth';
import notAuth from '../middlewares/notAuth';
import { User, Post } from '../../db/models';

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

router.get('/students', isAuth, async (req, res) => {
  try {
    const students = await User.findAll();
    const initState = { students };
    res.render('Layout', initState);
  } catch (error) {
    res.sendStatus(500);
  }
});

router.get('/posts', isAuth, async (req, res) => {
  try {
    const allPosts = await Post.findAll({
      include: User,
      order: [['updatedAt', 'DESC']],
    });
    const initState = { allPosts };
    res.render('Layout', initState);
  } catch (error) {
    res.sendStatus(500);
  }
});

export default router;
