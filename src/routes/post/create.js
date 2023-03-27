const axios = require('axios')
module.exports = async (req, res) => {
    const postData = {
        title: req.body.postTitle,
        description: req.body.postDescription,
        userId: req.verifiedUser.id,
    }
    try{
        const mutation = `
        mutation createPost($userId: String!, $title: String!, $description: String!){
            createPost(userId: $userId, title: $title, description: $description)
        }
        `
        const data = await axios.post('http://localhost:3000/graphql',{
            query: mutation,
            variables: postData
        },{
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const slug = data.data.data.createPost
        res.redirect(`/post/success/${slug}`)
    }catch(err){
        res.send(err)
    }
}