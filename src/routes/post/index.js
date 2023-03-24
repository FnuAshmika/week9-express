const { route } = require('../auth')

const PostRouter = require('express').Router()

PostRouter.route('/create')
    .get(require('./create.view'))
    .post(require('./create'))


PostRouter.route('/success/:slug')
    .get(require('./created.view'))

PostRouter.route('/:slug')
    .get(require('./form.view'))


module.exports = PostRouter