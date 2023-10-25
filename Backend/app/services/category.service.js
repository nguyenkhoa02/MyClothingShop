const {ObjectId} = require("mongodb");

class CategoryService {
    constructor(client) {
        this.Category = client.db().collection("Categories");
    }

    extractCategoryData(payload) {
        const category = {
            name: payload.name,
        }

        Object.keys(category).forEach(
            (key) => category[key] === undefined && delete category[key]
        );
        return category;
    }

    async create(payload) {
        const category = this.extractCategoryData(payload);
        const result = await this.Category.findOneAndUpdate(
            category,
            {
                $set: {name: category.name}
            },
            {
                returnDocument: "after", upsert: true
            }
        )
        return result;
    }

    async find(filter){
        const cursor = await this.Category.find(filter);
        return await cursor.toArray();
    }

    async findByName(name){
        return await this.find({
            name: {$regex : new RegExp(name), $options: "i"}
        });
    }

    async findByID(id) {
        return await this.Category.findOne({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
    }

    async update(id, payload){
        const filter = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        };

        const update = this.extractCategoryData(payload);
        const result = await this.Category.findOneAndUpdate(
            filter,
            { $set: update },
            { returnDocument: "after" }
        );

        return result;
    }

    async delete(id) {
        const result = await this.Category.findOneAndDelete({
            _id : ObjectId.isValid(id) ? new ObjectId(id) : null,
        });

        return result;
    }


    async deleteAll() {
        const result = await this.Category.deleteMany();
        return result.deletedCount;
    }
}

module.exports = CategoryService;