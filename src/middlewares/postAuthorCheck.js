import { Post } from '../../db/models';

export default async function postAuthorCheck(req, res, next) {
  const { id } = req.params;
  const currentPost = await Post.findOne({ where: { id } });
  if (currentPost.authorId === req.session?.user?.id) return next();
  return res.sendStatus(403);
}
