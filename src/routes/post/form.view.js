const axios = require('axios')
module.exports= async (req, res) => {
    const slug = req.params.slug
    const query = `
        query postBySlug($slug: String!){
            postBySlug(slug: $slug){
                id,
                slug,
                title,
                description,
            }
        }
    `
    try{
        const data = await axios.post('http://localhost:3001/graphql', {
            query,
            variables:{
                slug
            }
        },{
            headers:{
                'Content-Type': 'application/json'
            }
        })
        const postData= data.data.data.postBySlug
        res.render('post', {user: req.verifiedUser, post: postData})
    }catch(err){
        console.log(err)
        res.redirect('/')
    }
}