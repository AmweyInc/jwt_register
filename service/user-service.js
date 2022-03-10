const UserModel = require('../models/user-model.js');
const bCrypt = require('bcrypt');
const uuid = require('uuid');
const mailService = require('./mail-service.js');
const tokenService = require('./token-service.js');
const UserDto = require('../dtos/user-dtos.js');
/* Пробовал сделать заглушку вместо UserModel для теста,
с использованием заглушки программа выполняется вся целиком.
    const User = new Object();
    User.email = 'mymail@mail.mymail';
    User.id = 1;
    User.isActivated = true;
*/

class UserService {
    async registration(email,password){
        const candidate = await UserModel.findOne({email});
        if(candidate){
            throw new Error(`Пользователь с почтовым адрессом ${email} уже существует.`);
        }

        const hashPassword = await bCrypt.hash(password,3);
        const activationLink = uuid.v4();
        const user = await UserModel.create({email,hashPassword,activationLink}); // Входит сюда и дальше не продолжает действие,проверил много раз дебагером
        await mailService.sendActivationMail(email,activationLink);
        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({...userDto});
        await tokenService.saveToken(userDto.id,tokens.refreshToken);
        return {
            ...tokens,
            User:userDto
        }
    }
}

module.exports = new UserService();