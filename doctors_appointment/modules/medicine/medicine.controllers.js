const MedicineModel = require('./medicine.model')
const DataUtils  = require('../../helpers/data');

const Medicine = {
    async add(data) {
        return await this.register(data);
    },
    async list(start, limit, from) {
        const $match = {  };
        if (from) $match.from = { $regex: new RegExp(`${from}`), $options: 'gi' };
        const query = [{ $match }];

        return DataUtils.paging({
            start,
            limit,
            sort: { created_at: -1 },
            model: MedicineModel,
            query,
        });
    },
    async getById(_id) {
        return MedicineModel.findOne({ _id, is_archived: false });
    },

    async addMedicine(data) {
        const med = await MedicineModel.findOne({medicine_code: data.medicine_code})
        if(med){
            throw {message :"Medicine already added", code: 400};
        }
        return await MedicineModel.create(data);
    },
    async update(id, data) {
        const med = await MedicineModel.findById(id);
        const med2 = await MedicineModel.findOne({medicine_code : data.medicine_code});
        if(!med){
            throw{message: "Medicine not found", code: 4000}
        }
        else if(data.medicine_code == med.medicine_code){
            return await MedicineModel.findByIdAndUpdate(id, data);
        }
        else if(med2){
            throw{message: "Dublicate medicine", code: 4000}
        }
        else{
            return await MedicineModel.findByIdAndUpdate(id, data);
        }
    },

    async archive(id) {
        return MedicineModel.findOneAndUpdate({ _id: id, is_archived: false }, { is_archived: true });
    },

}

module.exports = {
    Medicine,
    add: (req) => Medicine.add(req.payload),
    list: (req) => {
      const start = req.query.start || 0;
      const limit = req.query.limit || 20;
      const from = req.query.from || null;
      return Medicine.list(start, limit, from);
    },
    update:(req)=>{
        return Medicine.update(req.params.id, req.payload)
    },
    getById: (req) => Medicine.getById(req.params.id),
    addMedicine: (req) => Medicine.addMedicine(req.payload),
    archive: (req) => Medicine.archive(req.params.id),
  };
