import express from 'express';
import { Post, User } from '../../db/models';
import isAuth from '../middlewares/isAuth';
import postAuthorCheck from '../middlewares/postAuthorCheck';

const postsRouter = express.Router();

postsRouter
  .route('/:id')
  .delete(postAuthorCheck, async (req, res) => {
    try {
      const { id } = req.params;
      await Post.destroy({ where: { id } });
      return res.sendStatus(200);
    } catch (error) {
      console.log(error);
      return res.sendStatus(500);
    }
  })
  .patch(async (req, res) => {
    try {
      const { id } = req.params;
      const foundPost = await Post.findOne({ where: { id } });
      const {title, body} = req.body;
      foundPost.title = title;
      foundPost.body = body;
      await foundPost.save();
      return res.json(foundPost);
    } catch (error) {
      console.log(error);
      return res.sendStatus(500);
    }
  })
  .get(async (req, res) => {
    const foundPost = await Post.findOne({ where: { id: req.params.id } });
    return res.json(foundPost);
  });

postsRouter.post('/', isAuth, async (req, res) => {
  try {
    const { title, body } = req.body;
    const newPost = await Post.create({ title, body, userId: req.session?.user?.id });
    const newPostWithUser = await Post.findOne({ where: { id: newPost.id }, include: User });
    return res.json(newPostWithUser);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

export default postsRouter;
