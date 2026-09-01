const followModel = require("../model/follow.model");
const postModel = require("../model/post.model");
const userModel = require("../model/user.model");

async function followUserController(req, res) {
  const followerUsername = req.user.username;
  const followeeUsername = req.params.username;
  console.log(followerUsername);
  console.log(followeeUsername);



  if (followerUsername == followeeUsername) {
    return res.status(401).json({
      message: "You can't follow your self",
    });
  }

  const isUserExist = await userModel.findOne({
    username: followeeUsername,
  });

  if (!isUserExist) {
    return res.status(404).json({
      message: "User is not exist",
    });
  }

    const isAlredyFollowing = await postModel.findOne({
    follower: followerUsername,
    followee: followeeUsername,
  });

  if (isAlredyFollowing) {
    return res.status(401).json({
      message: `you are alredy follow the ${followerUsername}`,
      follow:isAlredyFollowing,
    });
  }

  const followRecord = await followModel.create({
    follower: followerUsername,
    followee: followeeUsername,
  });

  res.status(201).json({
    message: `You are following ${followeeUsername}`,
    followRecord,
  });
}

async function unfollowUserController(req,res){
    const id = req.user.id
    const followerUsername =req.user.username
    const followeeUsername = req.params.username
    console.log(id)
    console.log(followerUsername)
    console.log(followeeUsername)

    const isUserFollowing = await followModel.findOne(
        {
            follower:followerUsername,
            followee:followeeUsername
        }
    )
    if(!isUserFollowing){
        return res.status(404).json(
            {
                message:`you are not follow the ${followeeUsername}`
            }
        )
    }
    const userid = isUserFollowing._id

    const unfollow = await followModel.findByIdAndDelete(userid)
    res.status(201).json({
        message:`your are unfollow the ${followeeUsername}`,
        isUserFollowing,
        unfollow,
        userid
    })
}

// async function unfollowUserController(req, res) {

//     const id = req.user.id
//     const followerUsername = req.user.username
//     const followeeUsername = req.params.username

//     console.log("ID:", id)
//     console.log("Follower:", followerUsername)
//     console.log("Followee:", followeeUsername)

//     const isUserFollowing = await followModel.findOne({
//         follower: followerUsername,
//         followee: followeeUsername
//     })

//     if (!isUserFollowing) {
//         return res.status(404).json({
//             message: `You are not following ${followeeUsername}`
//         })
//     }

//     res.status(200).json({
//         message: "User found, ready to unfollow",
//         isUserFollowing
//     })
// }
module.exports = { followUserController ,unfollowUserController };
