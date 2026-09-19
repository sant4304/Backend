const followModel = require("../models/follow.model")
const userModel = require("../models/user.model")

async function  folloUserController(req,res) {
    
    const id =req.user.id
    const followerUsername = req.user.username
    const followeeUsername = req.params.username
    console.log(id)
    console.log(followerUsername)
 
    console.log(followeeUsername)

 
    if(followerUsername == followeeUsername){
        return res.status(400).json(
            {
                message:"You can not follow your self"
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
                message:"User not exist"
            }
        )
    }

   const isAlredyFollowing =await followModel.findOne({
    follower:followerUsername,
    followee:followeeUsername
   })



   if(isAlredyFollowing){
    return res.status(401).json(
        {
            message:"You alredy follow the user",
            follow:isAlredyFollowing
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
            message:`You are following the ${followerUsername}`,
            followRecord
        }
    )

}


async function unfollowUserController(req,res){
     const followerUsername = req.user.username
     const followeeUsername = req.params.username

    const isUserFollowing = await followModel.findOne(
        {
            follower:followerUsername,
            followee:followeeUsername
        }
    )
    if(!isUserFollowing){
        return res.status(404).json(
            {
                message:`You are not following ${followeeUsername}`
            }
        )
    }
    
    
    console.log(isUserFollowing)
    const unfollow = await followModel.findByIdAndDelete(
    isUserFollowing._id
    )
   
    console.log(unfollow)
    res.status(201).json(
        {
            message:`You have unfollowed ${followeeUsername}`,
            unfollow,
            isUserFollowing
        }
    )
}
module.exports = {folloUserController,unfollowUserController}