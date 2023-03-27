const axios = require('axios')

const userData = async (req, res, next)=> { 
    if(!req.verifiedUser){
        return next()
    }
    try{
        const query = `
            query user($id: ID!){
                user(id: $id){
                    id,
                    username,
                    email,
                    posts{
                        id,
                        slug,
                        title,
                        description,
                        user{
                            id,
                            username
                        }
                    }
                }
            }
        `
        const data = await axios.post('http://localhost:3000/graphql',{
            query: query,
            variables: {
                id: req.verifiedUser.user._id
            }   
        },{
            headers: {
                'Content-Type' : 'application/json'
            }
        })
        // let user = data.data.data.user
        req.verifiedUser.user.posts = data.data.data.user?.posts ?? []
        next()
    }catch(e){
        console.log(e)
        next()

    }
}

module.exports={ userData }