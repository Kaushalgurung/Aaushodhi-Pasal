const { Admin } = require('../modules/admin/admin.controllers');

const Secure = async (reoutePermissions, req) => {
  if (reoutePermissions.length === 0) return true;

  const token = req.query.access_token || req.headers.access_token;
  if (!token) throw Error('No access token was sent');

  try {
    const decoded = Admin.verifyToken(token);
    return decoded;
  } catch (e) {
    return false;
  }
};

module.exports = Secure;
