import { Post } from '../../db/models';

export default async function postAuthorCheck(req, res, next) {
  try {
    const { id } = req.params;
    const currentPost = await Post.findOne({ where: { id } });
    if (currentPost.userId === req.session?.user?.id) return next();
    return res.sendStatus(403);
  } catch (er) {
    return res.sendStatus(500);
  }
}
