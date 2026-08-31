npm i bcryptjs
 we using bcrypt js for cheching a password

  const hash = await bcrypt.hash(password,10)

 # for comparing a pass word  
 const isPasswordVaild = await bcrypt.compare(password,user.password) 

 # express can store the file so we can use multer
 npm i multer
 

 if two collection jo relation btaa de 2 documnet ke bich main usee hum edge-collection khete hain

 timestamps:true it tell about the time (which req is executed) and last kab update huaa thaa