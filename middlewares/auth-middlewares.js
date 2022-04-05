const ApiError = require('../exceptions/api-error.js')
const tokenService = require('../service/token-service.js')

module.exports = function (req,res,next){
    try {
        const authorizationHeader = req.header.authorization;
        if (!authorizationHeader){
            return next(ApiError.UnauthorizedError());
        }
        const accessToken = authorizationHeader.split(' ')[1];
        if (!accessToken){
            return next(ApiError.UnauthorizedError());
        }

        const userData = tokenService.validationAccessToken(accessToken);
        if(!userData){
            return next(ApiError.UnauthorizedError());
        }

        req.user = userData;
        next();
    }catch (e){
        return next(ApiError.UnauthorizedError());
    }
}