export default function isAuth(req, res, next) {
  if (req.session?.user?.id) return next();
  return res.sendStatus(403);
}
// 401 - Unathorized
// 403 - Forbidden
// 404 - Not found
