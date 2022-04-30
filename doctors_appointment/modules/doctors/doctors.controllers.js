const DoctorModel = require('./doctors.model')
const DataUtils  = require('../../helpers/data');

const Doctor = {
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
            model: DoctorModel,
            query,
        });
    },
    async getById(_id) {
        return DoctorModel.findOne({ _id, is_archived: false });
    },

    async register(data) {
        const user = await DoctorModel.findOne({email: data.email})
        if(user){
            throw {message :"Email already registered", code: 400};
        }
        const user1 = await DoctorModel.findOne({phone: data.phone})
        if(user1){
            throw {message :"Phone already registered", code: 400};
        }
        return await DoctorModel.create(data);
    },
    async update(id, data) {
        const user = await DoctorModel.findById(id);
        const user2 = await DoctorModel.findOne({email : data.email});
        if(!user){
            throw{message: "User not found", code: 4000}
        }
        else if(data.email == user.email){
            return await DoctorModel.findByIdAndUpdate(id, data);
        }
        else if(user2){
            throw{message: "Dublicate email", code: 4000}
        }
        else{
            return await DoctorModel.findByIdAndUpdate(id, data);
        }
    },

    async archive(id) {
        return DoctorModel.findOneAndUpdate({ _id: id, is_archived: false }, { is_archived: true });
    },

}

module.exports = {
    Doctor,
    add: (req) => Doctor.add(req.payload),
    list: (req) => {
      const start = req.query.start || 0;
      const limit = req.query.limit || 20;
      const from = req.query.from || null;
      return Doctor.list(start, limit, from);
    },
    update:(req)=>{
        return Doctor.update(req.params.id, req.payload)
    },
    getById: (req) => Doctor.getById(req.params.id),
    register: (req) => Doctor.register(req.payload),
    archive: (req) => Doctor.archive(req.params.id),
  };
