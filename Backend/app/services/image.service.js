const {ObjectId} = require("mongodb");
// const {isAbsolute} = require("express/lib/utils");

class ImageService {
    constructor(client) {
        this.Image = client.db().collection("Images");
    }

    extractImageData(payload) {
        const image = {
            link: payload.link,
            name: payload.name,

        }

        Object.keys(image).forEach(
            (key) => image[key] === undefined && delete image[key]
        );
        return image;
    }

    async create(payload) {
        const image = this.extractImageData(payload);
        const result = await this.Image.findOneAndUpdate(
            image,
            {
                returnDocument: "after", upsert: true
            }
        )
        return result;
    }

    async find(filter){
        const cursor = await this.Image.find(filter);
        return await cursor.toArray();
    }

    async findByName(name){
        return await this.find({
            name: {$regex : new RegExp(name), $options: "i"}
        });
    }

    async findByID(id) {
        return await this.Image.findOne({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
    }

    async update(payload){
        const filter = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        };

        const update = this.extractImageData(payload);
        const result = await this.Image.findOneAndUpdate(
            filter,
            { $set: update },
            { returnDocument: "after" }
        );

        return result;
    }

    async delete(id) {
        const result = await this.Image.findOneAndDelete({
            _id : ObjectId.isValid(id) ? new ObjectId(id) : null,
        });

        return result;
    }


    async deleteAll() {
        const result = await this.Image.deleteMany();
        return result.deletedCount;
    }
}

module.exports = ImageService
