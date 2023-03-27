module.exports=(req, res) => {
    res.render('post-success', { slug: req.params.slug })
}