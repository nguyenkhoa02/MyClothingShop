const {ObjectId} = require("mongodb");

class CartService {
    constructor(client) {
        this.Cart = client.db().collection("Cart");
    }

    extractCartData(payload) {
        const cart = {
            name: payload.name,

        }

        Object.keys(cart).forEach(
            (key) => cart[key] === undefined && delete cart[key]
        );
        return cart;
    }

    async create(payload) {
        const user = this.extractCartData(payload);
        const result = await this.Cart.findOneAndUpdate(
            user,
            {
                // $set: {name: user.name}
            },
            {
                returnDocument: "after", upsert: true
            }
        )
        return result;
    }

    async find(filter){
        const cursor = await this.Cart.find(filter);
        return await cursor.toArray();
    }

    async findByName(name){
        return await this.find({
            name: {$regex : new RegExp(name), $options: "i"}
        });
    }

    async findByID(id) {
        return await this.Cart.findOne({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
    }

    async update(id, payload){
        const filter = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        };

        const update = this.extractCartData(payload);
        const result = await this.Cart.findOneAndUpdate(
            filter,
            { $set: update },
            { returnDocument: "after" }
        );

        return result;
    }

    async delete(id) {
        const result = await this.Cart.findOneAndDelete({
            _id : ObjectId.isValid(id) ? new ObjectId(id) : null,
        });

        return result;
    }


    async deleteAll() {
        const result = await this.Cart.deleteMany();
        return result.deletedCount;
    }
}

module.exports = CartService;