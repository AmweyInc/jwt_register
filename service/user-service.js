const bCrypt = require('bcrypt');
const uuid = require('uuid');

const UserModel = require('../models/user-model.js');
const mailService = require('./mail-service.js');
const tokenService = require('./token-service.js');
const UserDto = require('../dtos/user-dtos.js');

const API_URL = 'http://localhost:7000/'
const CLIENT_URL = 'http://localhost:7000/'


class UserService {
    async registration(email,password){
        const candidate = await UserModel.findOne({email});
        if(candidate){
            throw new Error(`Пользователь с почтовым адрессом ${email} уже существует.`);
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
        const user = await UserModel.findOne({activationLink});
        if (!user){
            throw new Error('Некорректная ссылка активации')
        }
        user.isActivated = true;
        await user.save();
    }
}

module.exports = new UserService();