const Redis = require("ioredis")

const redis = new Redis(
    {
     host:"rewarding-boreal-yearlong-60406.db.redis.io",
     port:"16493",
     password:"pNN5NdUZREi7Y2NSDoQsEd1kofs7ECMh"
    }
)

redis.on("connect",()=>{
    console.log("server is connected to redis")
})

redis.on("erroe",(error)=>{
    console.log("Redis error ",error)
})

module.exports = redis