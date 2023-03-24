module.exports=(req,res) => {
    res.render('posts', { user: req.verifiedUser })
}