const {ObjectId} = require("mongodb");

class UserService {
    constructor(client) {
        this.User = client.db().collection("User");
    }

    extractUserData(payload) {
        const user = {
            phone: payload.phone,
            password: payload.password,
            email: payload.email,
            fullName: payload.fullName,
            address: payload.address,
            roles: payload.roles,
            refreshToken: payload.refreshToken
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
                $set: {roles: 'user'}
            },
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

    async findOne(filter) {
        return await this.User.findOne(filter);
    }

    async findByPhoneNumber(phone){
        return await this.findOne({
            phone: {$regex : new RegExp(phone), $options: "i"}
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