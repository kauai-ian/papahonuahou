require("dotenv").config();
const { auth } = require("express-oauth2-jwt-bearer");

//authorization middleware when used, the access token must exist and be verified against the Auth0 JWKS
exports.checkJwt = auth({
  audience: "honuahou",
  issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
  secret: process.env.AUTH0_SECRET,
  tokenSigningAlg: "RS256", 
});
console.log(this.checkJwt);
