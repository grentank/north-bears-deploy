import express from 'express';
import isAuth from '../middlewares/isAuth';
import notAuth from '../middlewares/notAuth';
import { User } from '../../db/models';

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
  const students = await User.findAll();
  res.render('Layout', { students });
});

export default router;
