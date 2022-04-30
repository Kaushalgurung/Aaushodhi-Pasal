const CustomerModel = require('./customer.model')
require('dotenv').config('/.env');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const DataUtils  = require('../../helpers/data');

const Customer= {
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
            model: CustomerModel,
            query,
        });
    },
    async getById(_id) {
        return CustomerModel.findOne({ _id, is_archived: false });
    },
    async findById(_id){
        return CustomerModel.findOne({ _id: id, is_archived: false}).select('-password');
    },
    async verifyToken (data){
        console.log(data)
        const token = data;
        const decoded = jwt.verify(token, process.env.TOKEN_KEY);
        const user = await CustomerModel.findOne({ email: decoded.email });
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
        const user = await CustomerModel.findOne({ email: decoded.email });
        if (user) {
            try{
                //const res = await this.login({email: user.email, password: oldPassword});
                const salt = parseInt(process.env.TOKEN_KEY);
                encrypted_password = await bcrypt.hash(newPassword, salt);
                const done = await CustomerModel.findOneAndUpdate({email: decoded.email},{password: encrypted_password});
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
        const {name, email, password } =  data;

        if(!(name && email && password)){
            return "All input is required";
        }
        const oldUser = await CustomerModel.findOne({email});
        if(oldUser){
            return "Customer already exist, please login";
        }
        const salt = parseInt(process.env.TOKEN_KEY);
        encrypted_password = await bcrypt.hash(password, salt);

        const user = await CustomerModel.create({
            name: name,
            email: email.toLowerCase(),
            password: encrypted_password
        });
        // const token = jwt.sign(
        //     {user_id : user._id, email, is_user: user.is_user},
        //     "aditya",
        //     {
        //         expiresIn: "12h",
        //     }
        // );
        // user.token  = token;
        return user;
    },
    async login(data){
        try{
            const {email, password} = data;
            if (!(email && password)) {
                throw "All input is required";
            }
            const user = await CustomerModel.findOne({ email });
            if (user) {
                if(await bcrypt.compare(password, user.password)){
                    const token = jwt.sign(
                        {user_id : user._id, email, is_user: user.is_user},
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
        return CustomerModel.findOneAndUpdate({ _id: id, is_archived: false }, { is_archived: true });
    },

}

module.exports = {
    Customer,
    add: (req) => Customer.add(req.payload),
    list: (req) => {
      const start = req.query.start || 0;
      const limit = req.query.limit || 20;
      const from = req.query.from || null;
      return Customer.list(start, limit, from);
    },
    getById: (req) => Customer.getById(req.params.id),
    register: (req) =>Customer.register(req.payload),
    login: (req) =>Customer.login(req.payload),
    archive: (req) => Customer.archive(req.params.id),
    verifyToken: (req) => Customer.verifyToken(req.params.token),
    changePassword:(req)=>Customer.changePassword(req)
  };
