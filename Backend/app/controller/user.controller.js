const MongoDB=require("../utils/mongodb.util");
const ApiError = require("../api-error");
const UserService = require("../services/user.service");

exports.validate = async (req, res, next) => {
    //TODO: Xacs thucwj ddang nhap
}

// exports.create = async (req,res,next) => {
//     const {username, password} = req.body
//     if(!username || !password){
//         return next(new ApiError(400,"Name or password can not be empty"));
//     }
//
//     try{
//         const userService = new UserService(MongoDB.client);
//         const doc = userService.findByName(username);
//         if (!doc){
//             const document = await userService.create(req.body);
//             return res.send(document);
//         }
//         return res.send({message: "Username is already registered!"})
//     }
//     catch (error){
//         return next(new ApiError(500,"An error occurred while creating User!"))
//     }
// }

/*
findAll -> get All List category
 */

//FIXME: ??? findAll for???
exports.findAll = async (req,res,next)=>{
    let docs=[];
    try{
        const userService = new UserService(MongoDB.client);
        const {phone} = req.query;
        if(phone){
            docs = await userService.findByPhoneNumber(phone);
        }
        else {
            docs = await userService.find({});
        }
    }
    catch (error){
        return next(
            new ApiError(500,"An error occurred while retrieving user")
        );
    }
    return res.send(docs);
};
/*
findOne -> return a user
 */
exports.findOne = async(req,res,next)=>{
    try{
        const userService = new UserService(MongoDB.client);
        const document = await userService.findByID(req.params.id);
        //FIXME:get user form patch
        if(!document){
            return next(new ApiError(404,"User not found"));
        }
        return res.send(document);
    }
    catch (error){
        return next(
            new ApiError(500,`Error retrieving user with id=${req.params.id}`)
        );
    }
};

exports.delete = async(req,res,next)=>{
    try{
        const userService = new UserService(MongoDB.client);
        const document = await userService.delete(req.params.id);
        if(!document){
            return next(new ApiError(404,"User not found"));
        }
        return res.send({message:"User was deleted successfully"});
    }
    catch (error){
        return next(new ApiError(500,`Could not delete user with id=${req.params.id}`))
    }
}

exports.update = async(req,res,next)=>{
    if(Object.keys(req.body).length === 0){
        return next(new ApiError(400,"Date to update can not be empty"));
    }

    try{
        const userService = new UserService(MongoDB.client);
        const  document = await userService.update(req.params.body,req.body);
        if(!document){
            return next(new ApiError(404,"User not found"));
        }
        return res.send({message: "User was update successfully"});
    }
    catch (error){
        return next(new ApiError(500,`Error updating user with id=${req.params.id}`));
    }
}