const { User,Post } = require('../models')
const { UserType, PostType } = require('./types')
const { GraphQLList, GraphQLID, GraphQLString } = require('graphql')

const users={
    type: new GraphQLList(UserType),
    description: 'Query all users from database',
    resolve(parent, args){
        return User.find()
    }
}

const user = {
    type: UserType,
    description: "Query a user by their ID",
    args:{
        id: { type: GraphQLID}
    },
    resolve(parent, args){
        return User.findById(args.id)
    }
}
const posts={
    type: new GraphQLList(PostType),
    description: 'Query all posts from database',
    resolve(parent, args){
        return Post.find()
    }
}

const post = {
    type: PostType,
    description: "Query a post by  ID",
    args:{
        id: { type: GraphQLID}
    },
    resolve(parent, args){
        return Post.findById(args.id)
    }
}

const postBySlug={
    type: PostType,
    description: "Query a post by its slug",
    args: {
        slug: {type: GraphQLString}
    },
    resolve(parent, args){
        return Post.findOne({ slug: args.slug })
    }
}

module.exports={
    users,
    user,
    posts,
    post,
    postBySlug
}