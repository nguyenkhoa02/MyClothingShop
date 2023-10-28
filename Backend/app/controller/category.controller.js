const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");
const CategoryService = require("../services/category.service");


/*
create -> add a new category
 */
exports.create = async (req, res, next) => {
    if(!req.body?.name) {
        return next(new ApiError(400, "Name can not be empty"));
    }

    try {
        const categoryService = new CategoryService(MongoDB.client);
        const document = await categoryService.create(req.body);
        return res.send(document);
    }
    catch (error) {
        return next(new ApiError(500, "An error occurred while creating the Category!"))
    }
}

/*
findAll -> get All List categories
 */
exports.findAll = async (req, res, next) => {
    let docs = [];

    try {
        const categoryService = new CategoryService(MongoDB.client);
        const { name } = req.query;
        if (name) {
            docs = await categoryService.findByName(name);
        }
        else {
            docs = await categoryService.find({});
        }
    }
    catch (error) {
        return next(
            new ApiError(500, "An error occurred while retrieving category")
        );
    }
    return res.send(docs);
}

/*
findOne -> return a category
 */
exports.findOne = async (req, res, next) => {
    try{
        const categoryService = new CategoryService(MongoDB.client);
        const document =  await categoryService.findByID(req.params.id);
        // FIXME: get category from patch
        if(!document){
            return next(new ApiError(404, "Category not found"));
        }
        return res.send(document);
    }
    catch (error) {
        return next(
            new ApiError(500, `Error retrieving category with id=${req.params.id}`)
        );
    }
};

exports.delete = async (req, res, next) => {
    try{
        const categoryService = new CategoryService(MongoDB.client);
        const document = await categoryService.delete(req.params.id);
        if (!document) {
            return next(new ApiError(404, "Category not found"));
        }
        return res.send({message : "Category was deleted successfully"});
    }
    catch (error) {
        return next(new ApiError(500, `Could not delete category with id=${req.params.id}`));
    }
}

exports.update = async (req, res, next) => {
    if (Object.keys(req.body).length === 0){
        return next(new ApiError(400, "Data to update can not be empty"));
    }

    try {
        const categoryService = new CategoryService(MongoDB.client);
        const document = await categoryService.update(req.params.id, req.body);
        if (!document) {
            return next(new ApiError(404, "Category not found"));
        }
        return res.send({message: "Category was update successfully"});
    }
    catch (error) {
        return next(new ApiError(500, `Error updating category with id=${req.params.id}`));
    }
}

