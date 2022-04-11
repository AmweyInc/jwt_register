const jwt = require('jsonwebtoken');
const tokenModel = require('../models/token-model.js')
const ACCESS_TOKEN = 'mydream';
const REFRESH_TOKEN = 'life';


class TokenService {
    generateTokens(payload){
        const accessToken = jwt.sign(payload,ACCESS_TOKEN,{expiresIn: '30m'});
        const refreshToken = jwt.sign(payload,REFRESH_TOKEN,{expiresIn: '30d'});
        return{
            accessToken,
            refreshToken
        }
    }
    validationAccessToken(token){
        try {
            const userData = jwt.verify(token,ACCESS_TOKEN);
            return userData;
        }catch (e){
            return null;
        }
    }
    validationRefreshToken(token){
        try {
            const userData = jwt.verify(token,REFRESH_TOKEN);
            return userData;
        }catch (e){
            return null;
        }
    }

    async saveToken(userId,refreshToken){
        const tokenData = await tokenModel.findOne({user:userId})
        if(tokenData){
            tokenData.refreshToken = refreshToken;
        }
        const token = await tokenModel.create({user:userId,refreshToken});
        return token;
    }

    async removeToken(refreshToken){
        const tokenData = await tokenModel.deleteOne({refreshToken});
        return tokenData;
    }

    async findToken(refreshToken){
        const tokenData = await tokenModel.findOne({refreshToken});
        return tokenData;
    }
}

module.exports = new TokenService();