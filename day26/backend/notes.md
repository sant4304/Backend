mongoose express  jsonwebtoken  bcryptjs dotenv cookie-parser

-->   const decoded = jwt.decode(token)
-->   const decoded = jwt.verify(token,process.env.JwT_SEC) this both method is same

# jwt.decode(token)  == jwt.verify(token,process.env.JwT_SEC)  both are same

why redies is not used as primary data base
  --> so coslty (its use ram because its read and write meory bhoot fast hoti hain)
  --> we do not perforne query:-because it is store the data in key value pair and value string   
      type main hoti hain
MONGODB :-it store the in BSON formate
# installing redis
  npm i ioredis

  with the help of redis.set we can write any data in redis



  