// const randToken = require('rand-token');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");
const UserService = require("../services/user.service");
const AuthService = require("../services/auth.service");
const config = require('../config')
// const jwtVariable = require('../../variables/jwt');
const {SALT_ROUNDS} = require('../../variables/auth');

function jwtSignUser(user) {
    return jwt.sign(user, config.authentication.jwtSecret, {
     expiresIn: '1h'
    })
}

exports.register = async (req, res, next) => {
    const userService = new UserService(MongoDB.client);
    const phone = req.body.phone;
    const user = await userService.findByPhoneNumber(phone);
    console.log(user)
    if (user) {
        return next(new ApiError(400, 'Phone number is already in use.'));
    } else {
        const hashPassword = bcrypt.hashSync(req.body.password, SALT_ROUNDS);

        const newUser = {
            phone: phone,
            password: hashPassword,
            fullName: req.body.fullName,
            email: req.body.email,
            address: '',
            roles: 'user'
        };

        try {
            const user = await userService.create(newUser);

            if (!user) {
                return next(new ApiError(400, 'Error occurred when creating account!'));
            }
            const userJson = {id: user._id, phone: user.phone, role: user.roles}
            const token = jwtSignUser(userJson)
            // res.setHeader('Set-Cookie', `user_token=${token}`)
            res.cookie('token', token, { httpOnly: true, expires: new Date(Date.now() + 3600000) })
            return res.send({
                user: userJson,
                token: token
            });
        }
        catch (e){
            console.log(e)
        }
    }
};

exports.login = async (req, res, next) => {
    try {
        const userService = new UserService(MongoDB.client);
        const phone = req.body.phone;
        const password = req.body.password;


        const user = await userService.findByPhoneNumber(phone);
        console.log(user.fullName);
        if (!user) {
            return next(new ApiError(401, 'Your phone number is not registered.'))
        }

        const isPasswordValid = await bcrypt.compareSync(password, user.password);
        if (!isPasswordValid) {
            return next(new ApiError(401, 'Incorrect Password'));
        }

        const userJson = {id: user._id, phone: user.phone, role: user.roles}
        const token = jwtSignUser(userJson)
        res.cookie('token', token, { httpOnly: true, expires: new Date(Date.now() + 3600000) })
        return res.send({
            user: userJson,
            token: token
        });
    }
    catch (e){
        return next(new ApiError(500, 'An error has occurred.'))
    }
};

exports.logout = async (req, res, next) => {
    // res.setHeader('Set-Cookie', `user_token=; HttpOnly;`)
    res.clearCookie('token')
    return res.json({message: 'Logged Out'})
}

exports.user = async (req, res, next) => {
    let user_token = null;
    if (req.headers.cookie) {
        user_token = req.headers.cookie;
    }

    if (!user_token) {
        return next(new ApiError(401, 'Unauthenticated'));
    }
    let userToken = user_token ? user_token.split('=')[1] : null;

    const decode = jwt.verify(userToken, config.authentication.jwtSecret)
    const userPhone = decode.phone;

    const userService = new UserService(MongoDB.client);
    const user = await  userService.findByPhoneNumber(userPhone);
    if (!user) {
        return next(new ApiError(401, 'Unauthenticated'))
    }
    let userJson = {id: user._id, phone: user.phone, role: user.roles}
    const token = jwtSignUser(userJson)
    return res.send({
        user: userJson,
        token: token
    });
}