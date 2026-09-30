const Redis = require("ioredis")

const redis = new Redis(
    {
     host:"",
     port:"",
     password:""
    }
)

redis.on("connect",()=>{
    console.log("server is connected to redis")
})

redis.on("erroe",(error)=>{
    console.log("Redis error ",error)
})

module.exports = redis
