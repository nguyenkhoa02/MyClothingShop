const {ObjectId} = require("mongodb");

class UserService {
    constructor(client) {
        this.User = client.db().collection("User");
    }

    extractUserData(payload) {
        const user = {
            username: payload.username,
            password: payload.password
        }

        Object.keys(user).forEach(
            (key) => user[key] === undefined && delete user[key]
        );
        return user;
    }

    async create(payload) {
        const user = this.extractUserData(payload);
        const result = await this.User.findOneAndUpdate(
            user,
            {
                returnDocument: "after", upsert: true
            }
        )
        return result;
    }

    async find(filter){
        const cursor = await this.User.find(filter);
        return await cursor.toArray();
    }

    async findByName(name){
        return await this.find({
            name: {$regex : new RegExp(name), $options: "i"}
        });
    }

    async findByID(id) {
        return await this.User.findOne({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
    }

    async update(id, payload){
        const filter = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        };

        const update = this.extractUserData(payload);
        const result = await this.User.findOneAndUpdate(
            filter,
            { $set: update },
            { returnDocument: "after" }
        );

        return result;
    }

    async delete(id) {
        const result = await this.User.findOneAndDelete({
            _id : ObjectId.isValid(id) ? new ObjectId(id) : null,
        });

        return result;
    }


    async deleteAll() {
        const result = await this.User.deleteMany();
        return result.deletedCount;
    }
}

module.exports = UserService;