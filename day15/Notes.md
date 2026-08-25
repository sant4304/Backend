npm i bcryptjs
 we using bcrypt js for cheching a password

  const hash = await bcrypt.hash(password,10)

 # for comparing a pass word  
 const isPasswordVaild = await bcrypt.compare(password,user.password) 

 # express can store the file so we can use multer
 npm i multer
 