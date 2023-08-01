const UserModel=require("../models/UserModel");
const bcrypt=require('bcrypt')
module.exports.get= async(req,res)=>{
    const users= await UserModel.find()
    res.send(users)
       
}
module.exports.signIn = (req, res) => {
    // const sessionId = uuidv4();
    const { username, email, password } = req.body;
  
    if ((!username && !email) || !password) {
      return res.status(400).json({
        error: true,
        message: "Username or email and password are required.",
      });
    }
  
    let query;
    if (username) {
      query = { username: username };
    } else {
      query = { email: email };
    }
  
    UserModel.findOne(query)
      .then((user) => {
        if (!user) {
          return res.status(404).json({
            error: true,
            message: "User not found.",
          });
        } else {
          if (!user.verified) {
            return res.status(400).json({
              error: true,
              status: "FAILED",
              message: "Email hasn't been verified.",
            });
          } else {
            bcrypt.compare(password, user.password)
              .then((same) => {
                if (same) {
                  const token = jwt.sign({ id: user._id }, privateKey, {
                    expiresIn: '4h',
                  });
                  sessions[sessionId] = { user, userId: user._id };
                  res.cookie('session', sessionId);
                  res.cookie('username', user.username);
  
  
                  res.json({ token, user,sessionId,  msg: "Successfully signed in." });
                  console.log(sessionId);
                  console.log(user.username);
  
                } else {
                  return res.status(401).json({
                    error: true,
                    message: "Invalid password or email.",
                  });
                }
              })
              .catch((error) => {
                console.error('Error occurred while comparing passwords:', error);
                res.status(500).json({
                  error: true,
                  message: "Internal server error.",
                });
              });
          }
        }
      })
      .catch((error) => {
        console.error('Error occurred while signing in:', error);
        res.status(500).json({
          error: true,
          message: "Internal server error.",
        });
      });
  };
