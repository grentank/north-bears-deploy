export default function adminCheck(req,res,next) {
    if (req.session?.user?.admin) {
        return next()
    } 
    return res.status(403).send('Access Denied')
}