const {ObjectId} = require("mongodb");

class ItemService {
    constructor(client) {
        this.Item = client.db().collection("Items");
    }

    extractItemData(payload) {
        const item = {
            code: payload.code,
            name: payload.name,
            description: payload.description,
            price: payload.price,
            instock: payload.instock,
            image: payload.image,
            category: payload.category
        }

        Object.keys(item).forEach(
            (key) => item[key] === undefined && delete item[key]
        );
        return item;
    }

    async create(payload){
        const item = this.extractItemData(payload);
        const result = await this.Item.findOneAndUpdate(
            item,
            {
                returnDocument: "after", upsert: true
            }
        );

        return result;
    }

    async find(filter){
        const cursor = await this.Item.find(filter);
        return await cursor.toArray();
    }

    async findByName(name){
        return await this.find({
            name: {$regex : new RegExp(name), $options: "i"}
        });
    }

    async findByID(id) {
        return await this.Item.findOne({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
    }

    async update(id, payload) {
        const filter = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        };

        const update = this.extractItemData(payload);
        const result = await this.Item.findOneAndUpdate(
            filter,
            { $set: update },
            { returnDocument: "after" }
        );

        return result;
    }

    async delete(id) {
        const result = await this.Item.findOneAndDelete({
            _id : ObjectId.isValid(id) ? new ObjectId(id) : null,
        });

        return result;
    }

    async deleteAll() {
        const result = await this.Item.deleteMany();
        return result.deletedCount;
    }
}

module.exports = ItemService;