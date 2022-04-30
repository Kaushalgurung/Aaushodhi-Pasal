const AdminModel = require('./admin.model')
require('dotenv').config('/.env');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const DataUtils  = require('../../helpers/data');

const Admin= {
    async add(data) {
        return await this.register(data);
    },
    async list(start, limit, from) {
        const $match = { is_archived: false };
        if (from) $match.from = { $regex: new RegExp(`${from}`), $options: 'gi' };
        const query = [{ $match }];

        return DataUtils.paging({
            start,
            limit,
            sort: { created_at: -1 },
            model: AdminModel,
            query,
        });
    },
    async getById(_id) {
        return AdminModel.findOne({ _id, is_archived: false });
    },
    async findById(_id){
        return AdminModel.findOne({ _id: id, is_archived: false}).select('-password');
    },
    async verifyToken (data){
        const token = data;
        const decoded = jwt.verify(token, process.env.TOKEN_KEY);
        const user = await AdminModel.findOne({ email: decoded.email });
        if (user) {
            return user.is_admin;
        } else {
            return false;
        }
    },
    async changePassword(req){
        token = req.headers.access_token;
        const { oldPassword,newPassword} = req.payload;
        const decoded = jwt.verify(token, process.env.TOKEN_KEY);
        const user = await AdminModel.findOne({ email: decoded.email });
        if (user) {
            try{
                //const res = await this.login({email: user.email, password: oldPassword});
                const salt = parseInt(process.env.TOKEN_KEY);
                encrypted_password = await bcrypt.hash(newPassword, salt);
                const done = await AdminModel.findOneAndUpdate({email: decoded.email},{password: encrypted_password});
                if(done){
                    return {message: "Password change successfully"};
                }
            }catch(err){
                console.log(err);
                throw err;
            }
        } else {
            throw {message: "Incorrect Token Please login and try again!", code:400};
        }
    },

    async register(data) {
        const {email, password } =  data;

        if(!(email && password)){
            return "All input is required";
        }
        const oldUser = await AdminModel.findOne({email});
        if(oldUser){
            return "admin already exist, please login";
        }
        const salt = parseInt(process.env.TOKEN_KEY);
        encrypted_password = await bcrypt.hash(password, salt);

        const user = await AdminModel.create({
            email: email.toLowerCase(),
            password: encrypted_password
        });
        const token = jwt.sign(
            {user_id : user._id, email, is_admin: user.is_admin},
            salt,
            {
                expiresIn: "2h",
            }
        );
        user.token  = token;
        return user;
    },
    async login(data){
        try{
            const {email, password} = data;
            if (!(email && password)) {
                throw "All input is required";
            }
            const user = await AdminModel.findOne({ email });
            if (user) {
                if(await bcrypt.compare(password, user.password)){
                    const token = jwt.sign(
                        {user_id : user._id, email, is_admin: user.is_admin},
                        process.env.TOKEN_KEY,
                    );
                    user.token = token;
                    return { token, email,  user_id :  user._id}
                    //return user;
                }
                else{
                    throw {message :"Invalid password", code: 400};
                }
            }
            else{
                throw {message :"Invalid Email or password", code: 400};
            }

        } catch (err) {
            throw err;
        }
    },

    async archive(id) {
        return AdminModel.findOneAndUpdate({ _id: id, is_archived: false }, { is_archived: true });
    },

}

module.exports = {
    Admin,
    add: (req) => Admin.add(req.payload),
    list: (req) => {
      const start = req.query.start || 0;
      const limit = req.query.limit || 20;
      const from = req.query.from || null;
      return Admin.list(start, limit, from);
    },
    getById: (req) => Admin.getById(req.params.id),
    register: (req) =>Admin.register(req.payload),
    login: (req) =>Admin.login(req.payload),
    archive: (req) => Admin.archive(req.params.id),
    verifyToken: (req) => Admin.verifyToken(req.params.token),
    changePassword:(req)=>Admin.changePassword(req)
  };
