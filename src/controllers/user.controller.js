const UserService = require("../services/user.service")
const {userCreationValidator, loginValidator} = require("../validators/user.validator")
const{ isValidId } = require("../validators/idValidators");
const jwt = require("jsonwebtoken");
const secretkey = process.env.JWTSECRETKEY;


exports.save = async(req,res)=> {
    try{
        const {error, value} = userCreationValidator.validate(req.body);
        if(error){
            console.log("error :", error);
            return res.status(403).send(error.details[0].message);
        }
        await UserService.create(req,res);
    } catch (error) {
        console.log("error", error);
    }
}

exports.verifyEmail = async (req, res) => {
    try {
      const {
        data: { email },
      } = jwt.verify(req.params.token, secretkey);
  
      const verified = await UserService.verifyemail(email);
  
      if (verified) {
        return res.send("Email verified successfully!");
      } else {
        return res.status(500).json({
          success: false,
          message: "Something went worng, please try again!",
        });
      }
    } catch (error) {
      console.log("error", error);
    }
  };

exports.getAll = async(req,res)=> {
        try{
            await UserService.getAll(req,res);
        } catch (error) {
            console.log("error", error);
        }
}

exports.getOne = async(req,res)=> {
    try{
        await UserService.getOne(req,res);
    } catch (error) {
        console.log("error", error);
    }
}

exports.UpdateAllUserData = async(req,res)=> {
    try{
        await UserService.UpdateAllUserData(req,res);
    } catch (error) {
        console.log("error", error);
    }
}

exports.deleteOne = async(req,res)=> {
    try{
        // console.log({req.params.id});
        // if({req.params.id}===undefined) return(res.status(403).send("ID is required"));
        if(!isValidId(req.params.id)) return(res.status(403).send("ID is not valid"));
        // await UserService.deleteOne(req,res);
    } catch (error) {
        console.log("error", error);
    }
}

exports.SetActiveUser = async(req,res)=> {
    try{
        await UserService.SetActiveUser(req,res);
    } catch (error) {
        console.log("error", error);
    }
}

exports.login = async(req,res)=> {
    try{
        const {error, value} = loginValidator.validate(req.body);
        if(error){
            console.log("error :", error);
            return res.status(403).send(error.details[0].message);
        }
        await UserService.login(req,res);
    } catch (error) {
        console.log("error", error);
    }
}

exports.passwordReset = async(req,res)=> {
    try{
        await UserService.passwordReset(req,res);
    } catch (error) {
        console.log("error", error);
    }
}