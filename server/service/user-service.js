const bCrypt = require('bcrypt');
const uuid = require('uuid');

const UserModel = require('../models/user-model.js');
const mailService = require('./mail-service.js');
const tokenService = require('./token-service.js');
const UserDto = require('../dtos/user-dtos.js');
const ApiError = require("../exceptions/api-error.js")

const API_URL = 'http://localhost:7000/'
const CLIENT_URL = 'http://localhost:3000';


class UserService {
    async registration(email,password){
        const candidate = await UserModel.findOne({email});
        if(candidate){
            throw ApiError.BadRequest(`Пользователь с почтовым адрессом ${email} уже существует.`);
        }

        const hashPassword = await bCrypt.hash(password,3);
        const activationLink = uuid.v4();
        const user = await UserModel.create({email:email,password:hashPassword,ActivationLink:activationLink});
        await mailService.sendActivationMail(email, `${API_URL}api/activate/${activationLink}`);
        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({...userDto});
        await tokenService.saveToken(userDto.id,tokens.refreshToken);
        return {
            ...tokens,
            User:userDto
        }
    }

    async activate(activationLink){
        const user = await UserModel.findOne({ActivationLink:activationLink});
        if (!user){
            throw ApiError.BadRequest('Некорректная ссылка активации')
        }
        user.isActivated = true;
        await user.save();
    }

    async login(email,password){
        const user = await UserModel.findOne({email});
        if (!user){
            throw ApiError.BadRequest("Пользователь с таким email не найден");
        }
        const isPassEquals = await bCrypt.compare(password,user.password);
        if (!isPassEquals){
            throw ApiError.BadRequest("Неверный пароль")
        }
        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({...userDto});
        await tokenService.saveToken(userDto.id,tokens.refreshToken);
        return {
            ...tokens,
            User:userDto
        }
    }
    async logout(refreshToken){
        const token = await tokenService.removeToken(refreshToken);
        return token;
    }

    async refresh(refreshToken){
        if(!refreshToken){
            throw ApiError.UnauthorizedError()
        }
        const userData = tokenService.validationRefreshToken(refreshToken);
        const tokenFromDb = await tokenService.findToken(refreshToken);
        if (!userData || !tokenFromDb){
            throw ApiError.UnauthorizedError();
        }
        const user = await UserModel.findById(userData.id);
        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({...userDto});
        await tokenService.saveToken(userDto.id,tokens.refreshToken);
        return {
            ...tokens,
            User:userDto
        }
    }

    async getAllUser(){
        const users = await UserModel.find();
        return  users;
    }
}

module.exports = new UserService();