import express from 'express';
import { Post, User, Like } from '../../db/models';
import isAuth from '../middlewares/isAuth';
import postAuthorCheck from '../middlewares/postAuthorCheck';

const likeRouter = express.Router();

likeRouter.post('/post/:postId', async (req, res) => {
  const userId = req.session.user.id;
  const { postId } = req.params;
  const like = await Like.findOne({
    where: { userId, postId },
  });
  const exists = !!like;
  if (!exists) {
    await Like.create({ userId, postId });
    const targetPost = await Post.findOne({
      where: { id: postId },
      include: ['User', 'likedBy'],
    });
    res.json(targetPost);
  } else {
    await Like.destroy({
      where: { userId, postId },
    });
    const targetPost = await Post.findOne({
      where: { id: postId },
      include: ['User', 'likedBy'],
    });
    res.json(targetPost);
  }
});

export default likeRouter;
