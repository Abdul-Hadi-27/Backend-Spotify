/* eslint-disable no-unused-vars */
/* eslin/t-disable no-unused-vars */
/* eslint-disable no-undef */
const jwt=require('jsonwebtoken')

 async function authArtist(req,res,next){
    const token=req.cookies.token;
    console.log("TOKEN:", token);
    console.log("COokies",req.cookies)
    
    if(!token){
        return res.status(401).json({
            message:"Unauthorized"
        })
    }
    try {
     const decoded=jwt.verify(token,process.env.JWT_SECRET)
     console.log("DECODED:", decoded);


        if(decoded.role!=="artist"){
            return res.status(403).json({
        message:"You dont have an access"})
            }
            req.user=decoded;

            next()
    } catch (error) {
        console.log(error)
         return res.status(401).json({
            message:"Unauthorized"
         })
        
    }
 }
  async function authUser(req,res,next){
    const token=req.cookies.token;
    if(!token){
        return res.status(401).json({
            message:"Unauthorized"
        })
    }
    try {
        const decoded=jwt.verify(token,process.env.JWT_SECRET)
        console.log("DECODED:", decoded);

        if(decoded.role !=="user")
        {
            return res.status(403).json({
                message:"You dont have access"
            })
        }
        req.user=decoded
        next()
    } catch (error) {
        res.status(401).json({
            message:"Unauthorized"
        })
        
    }
  }
  async  function authAny  (req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // user ya artist dono allowed
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};
 module.exports={authArtist,authUser,authAny}