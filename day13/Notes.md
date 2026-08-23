npm i cors --> app.use(cors())
npm i dotenv --> requirw("dotenv")
// app.use(express.static("public")) ---> access any file
    res.sendFile(path.join(__dirname, "../public/index.html"));


Secheama :- it help we say data kis formate main save hogaa
Model :-esii help se hum dtya ke upaar operation perform kar saktee hain

# we want cerate api in any file app.js file to express.Route ki help se hum create kar saktee hain

# 1 user ka data save karnaa data base
# 2 Creating a tokken -->tokeen create hoga (npm i jsonwebtoken)
jo token create hogaa bo user ke data 

# 3 we stote data in cookies aur es cookies ka access server ke pass rhetaa hain bo us data ko read kar saktaa hain and likh bhi saktaa hain data uske andaar (npm i cookie-parser) cookies storage clien side par rheti hain (const cookieParser = require("cookie-parser");)

# 4 npm install bcrypt   && const bcrypt = require("bcrypt");