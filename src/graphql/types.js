const {  GraphQLObjectType, GraphQLID, GraphQLString, GraphQLList } = require('graphql')
const { User, Post } = require('../models')
const UserType = new GraphQLObjectType({
    name: 'User',
    description: 'User type',
    fields: () => ({
        id: { type: GraphQLID },
        username: { type: GraphQLString},
        email: { type: GraphQLString },
        posts: {
            type: new GraphQLList(PostType),
            resolve(parent, args){
                return Post.find({
                    userId: parent.id
                })
            }
        }
    })
})

const PostType = new GraphQLObjectType({
    name: 'Post',
    description: 'Post type',
    fields: () => ({
        id: { type: GraphQLID },
        slug: { type: GraphQLString },
        title: { type: GraphQLString },
        description: { type: GraphQLString },
        userId: { type: GraphQLString },
        user:{
            type: UserType,
            resolve(parent, args){
                return User.findById(parent.userId)
            }
        }
    })
})

module.exports = {
    UserType,
    PostType
}