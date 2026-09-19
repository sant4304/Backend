const followModel = require("../model/follow.model")
const userModel = require("../model/user.model")

async function folloUserController(req,res){
    const id = req.user.id 

    const followerUsername = req.user.username
    const followeeUsername = req.params.username

    console.log(id,followerUsername,followeeUsername)
   
    if(followerUsername == followeeUsername){
        return res.status(401).json(
            {
                message:"You can't follow your self"
            }
        )
    }

    const isFollweeExist = await userModel.findOne(
        {
            username:followeeUsername
        }
    )
    
    if(!isFollweeExist){
        return res.status(404).json(
            {
                message:"User Not Found"
            }
        )
    }
   
    const isAlredyFollowing = await followModel.findOne({
        follower:followerUsername,
        followee:followeeUsername
    })
    
    if(isAlredyFollowing){
       return res.status(201).json(
        {
            message:"You are alredy follow each other"
        }
       )
    }
    const followRecord = await followModel.create(
        {
            follower:followerUsername,
            followee:followeeUsername
        }
    )
    res.status(201).json(
        {
            message:`you follow the ${followeeUsername}`,
            followRecord
        }
    )
}

async function unfollowUserController(req,res){
    const followerUsername = req.user.username
    const followeeUsername = req.params.username
    
    console.log(followerUsername)
    console.log(followeeUsername)

    const isUserFollowing = await followModel.findOne(
        {
            follower:followerUsername,
            followee:followeeUsername
        }
    )

    if(!isUserFollowing){
        return res.status(401).json(
            {
                message:"You are not follow each other"
            }
        )
    }

    const userId = isUserFollowing._id
    console.log(userId)

    const unfollow = await followModel.findByIdAndDelete(userId)
    res.status(201).json(
            {
                message:`You unfollow this user ${followeeUsername}`,
                unfollow
            }
        )
    
}

module.exports ={folloUserController,unfollowUserController}