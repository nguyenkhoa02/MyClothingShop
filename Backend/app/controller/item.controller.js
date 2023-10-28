//TODO: Them, sua, xoa, tim kiem item

const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");
const ItemService = require("../services/item.service");
const ImageService = require("../services/image.service");
const CategoryService = require("../services/category.service")

exports.create = async (req, res, next) => {
    if(!req.body?.name) {
        return next(new ApiError(400, "Name can not be empty"));
    }

    try {
        const itemService = new ItemService(MongoDB.client);
        const categoryService = new CategoryService(MongoDB.client);
        const imageService = new ImageService(MongoDB.client);

        const code = req.body.code ? req.body.code : "";
        const name = req.body?.name;
        const description = req.body?.description;
        const price = req.body?.price;
        const instock = req.body?.instock;
        const image = req.body?.image;
        const category = req.body?.categories;

        const _idCategory = categoryService.findByName(category);
        //TODO: upload anh, get id trong co so du lieu
        const _idImage = "id";

        const payload = {
            code: code,
            name: name,
            description: description,
            price: price,
            instock: instock,
            image: _idImage,
            category: _idCategory,
        };

        const doc = await itemService.create(payload);
        return res.send(doc);
        // const document = await itemService.create(req.body);
        // return res.send(document);

    }
    catch (error) {
        return next(new ApiError(500, "An error occurred while creating the Item!"));
    }
}


exports.findAll = async (req, res, next ) => {
    let docs = [];

    try {
        const itemService = ItemService(MongoDB.client);
        const { name } = req.query;
        if (name) {
            docs = await itemService.findByName(name);
        }
        else {
            docs = await itemService.find({});
        }
    }
    catch (e) {
        return next (new ApiError(500, "An error occurred while retrieving items!"))
    }
    return res.send(docs);
}

exports.findOne = async (req, res, next) => {
    try {
        const itemService = new ItemService(MongoDB.client);
        const document = await itemService.findByID(req.params.id);

        if (!document) {
            return next(new ApiError(404, "Category not found"));
        }
        return res.send(document);
    }
    catch (e) {
        return next(
            new ApiError(500, `Error retrieving item with id=${req.params.id}`)
        );
    }

}

exports.findItemCategory = async (req, res, next) => {
    try {
        const itemService = new ItemService(MongoDB.client);
        const document = await itemService.find({});
        return res.send(document)
        //TODO: viet lenh lay ra danh sach san pham voi category da cho req.params.category
    }
    catch (e) {
        return next(
            new ApiError(500, `Error occurred while Item is retrieving by category`)
        )
    }
}

exports.update = async (req, res, next) => {
    if (!Object.keys(req.body).length === 0){
        return next(new ApiError(400, "Data to update can not be empty"));
    }

    try {
        const itemService = new ItemService(MongoDB.client);
        const document = await itemService.update(req.params.id, req.body);
        //FixMe: Xu ly khi nguoi dung doi anh san pahm sang anh khac, doi thong tin category
        if (!document) {
            return next(new ApiError(404, "Item not found"));
        }
        return res.send({message: "Item was update successfully"});

    }
    catch (e) {
        return next(
            new ApiError(500, `Error occurred while updated Item with id=${req.params.id}`)
        )
    }
}

exports.delete = async (req, res, next) => {
    try{
        const itemService = new ItemService(MongoDB.client);
        const document = await itemService.delete(req.params.id);
        if (!document) {
            return next(new ApiError(404, "Item not found"));
        }
        return res.send({message : "Item was deleted successfully"});
    }
    catch (error) {
        return next(new ApiError(500, `Could not delete item with id=${req.params.id}`));
    }
}

// exports.deleteAll = async (req, res, next) => {
//
// }