npm i bcryptjs
 we using bcrypt js for cheching a password

  const hash = await bcrypt.hash(password,10)

 # for comparing a pass word  
 const isPasswordVaild = await bcrypt.compare(password,user.password) 

 # express can store the file so we can use multer
 npm i multer
 

 if two collection jo relation btaa de 2 documnet ke bich main usee hum edge-collection khete hain

 timestamps:true it tell about the time (which req is executed) and last kab update huaa thaa

 # we need extra information that we use populate("user")
     it only work when  we use ref in making a shema
 #    we don't to send some extra detaile we remove that information throug select in a schema
      select :false
      due to this login can do probelem it can start to ignore password 
     we want to select the password by thorug select("+password")