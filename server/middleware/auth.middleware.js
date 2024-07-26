const { auth } = require("express-oauth2-jwt-bearer");

//authorization middleware when used, the access token must exist and be verified against the Auth0 JWKS
exports.checkJwt = auth({
    audience: process.env.AUTH0_AUDIENCE,
    issuer: process.env.AUTH0_ISSUER,
});