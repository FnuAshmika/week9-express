const { User, Post } = require('../models')
const { GraphQLString } = require('graphql')
const { createJWT } = require('../util/auth')

const register = {
    type: GraphQLString,
    args: {
        username: {type: GraphQLString},
        email: {type: GraphQLString},
        password: {type: GraphQLString}
    },
    async resolve(parent, args){
        // Check if a user exists with inputted email
        const checkUser = await User.findOne({ email: args.email})
        if(checkUser){
            throw new Error('User with this email address already exists')
        }
        const newUser = new User({
            username: args.username,
            email: args.email,
            password: args.password
        })
        await newUser.save()
        return createJWT(newUser)
    }
}
const login = {
    type: GraphQLString,
    args: {
        email: { type: GraphQLString},
        password: { type: GraphQLString}
    },
    async resolve(parent,args){
        const user = await User.findOne({ email: args.email})
        if( !user || user.password !== args.password){
            throw new Error('Invalid Credentials')
        }
        return createJWT(user)
    }
}
const createPost = {
    type: GraphQLString,
    args : {
        title: { type: GraphQLString },
        description: { type: GraphQLString },
        userId: { type: GraphQLString },
    },
    async resolve(parent, args) {
        console.log(args)
        const slugify = args.title.toLowerCase()
            .replace(/[^\w ]+/g, '')
            .replace(/[ ]/g, '-')

        let fullSlug = ''

        while(true) {
            let slugId = Math.floor(Math.random() * 1000000)

            fullSlug = `${slugify}-${slugId}`

            const existingQuiz = await Post.findOne({ slug: fullSlug })

            if (!existingQuiz) {
                break
            }
        }
        const post = new Post({
            slug: fullSlug,
            title: args.title,
            description: args.description,
            userId: args.userId
        })
        await post.save()
        return fullSlug
    }
}
      
module.exports = {
    register,
    login,
    createPost
}