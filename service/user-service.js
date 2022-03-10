const UserModel = require('../models/user-model.js');
const bCrypt = require('bcrypt');
const uuid = require('uuid');
const mailService = require('./mail-service.js');
const tokenService = require('./token-service.js');
const UserDto = require('../dtos/user-dtos.js')


class UserService {
    async registration(email,password){
        const candidate = await UserModel.findOne({email});
        if(candidate){
            throw new Error(`Пользователь с почтовым адрессом ${email} уже существует.`);
        }
        const hashPassword = await bCrypt.hash(password,3);
        const activationLink = uuid.v4();
        const user = await UserModel.create({email,password:hashPassword,activationLink});
        await mailService.sendActivationMail(email,activationLink);

        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({...userDto});
        await tokenService.saveToken(userDto.id,tokens.refreshToken);

        return {
            ...tokens,
            user:userDto
        }
    }
}

module.exports = new UserService();