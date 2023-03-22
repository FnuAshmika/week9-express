const MainDashboardRouter = require('express').Router()

MainDashboardRouter.route('/')
    .get(require('./dashboard.view'))

MainDashboardRouter.route('/posts')
    .get(require('./posts.view'))


module.exports = MainDashboardRouter