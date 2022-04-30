const OrderModel = require("./order.model");
const DataUtils = require("../../helpers/data");
const readdir = require("@jsdevtools/readdir-enhanced");
const fs = require('fs');

const Order = {
  async add(data) {
    return await this.register(data);
  },
  async list() {
    var res = await OrderModel.find().lean();
    
   
    const promise = res.map(r=>{
     r.files = fs.readdirSync('./modules/order/productorder/').filter(f=>f.startsWith(r._id));
   })

   return Promise.all(promise).then(()=>{
     return res;
   }).catch(err=>{
     return res;
   })
  },

  async getByDoctorId(id, start, limit, from) {
    const $match = { is_archived: false, doctor_id: id };
    if (from) $match.from = { $regex: new RegExp(`${from}`), $options: "gi" };
    const query = [{ $match }];

    return DataUtils.paging({
      start,
      limit,
      sort: { created_at: -1 },
      model: OrderModel,
      query,
    });
  },
  async getById(_id) {
    return OrderModel.findOne({ _id, is_archived: false });
  },

  async register(data) {
    const ext = data.problem_doc.hapi['filename'].split('.')[1];
    // const user = await OrderModel.findOne({ email: data.email });
    // const user1 = await OrderModel.findOne({ phone: data.phone });
    // if (user) {
    //   throw { message: "Email already registered", code: 400 };
    // }
    // if (user1) {
    //   throw { message: "Phone already registered", code: 400 };
    // }
    const res = await OrderModel.create(data);
    fs.writeFileSync(__dirname +  `/productorder/${res._id}.${ext}`, Buffer(data.problem_doc._data));
    return 0;
  },
  async update(id, data) {
    const user = await OrderModel.findById(id);
    //const user2 = await OrderModel.findOne({ email: data.email });
    if (!user) {
      throw { message: "Prescription not found", code: 4000 };
    } else if (data.email == user.email) {
      return await OrderModel.findByIdAndUpdate(id, data);
    // } else if (user2) {
    //   throw { message: "Dublicate email", code: 4000 };
    } else {
      return await OrderModel.findByIdAndUpdate(id, data);
    }
  },
  async getProblemDoc(id){
    let files = await readdir.async(__dirname + '/productorder');
    for(var i in files){
      console.log(files[i]);
      if(files[i].split('.')[0] == id.toString()){
        const ret_file = fs.readFileSync(__dirname + '/productorder/' + files[i]);
        return {file: ret_file, name: files[i]};
      }
    }
    throw { message: "document not found", code: 4000 };
  },

  async approve(id) {
    return OrderModel.findOneAndUpdate(
      { _id: id, is_archived: false },
      { approved: true }
    );
  },
  async archive(id) {
    return OrderModel.findOneAndUpdate(
      { _id: id, is_archived: false },
      { is_archived: true }
    );
  },
  async complete(id) {
    return OrderModel.findOneAndUpdate(
      { _id: id, is_archived: false },
      { completed: true }
    );
  },
};

module.exports = {
  Order,
  add: (req) => Order.add(req.payload),
  list: (req) => {
    const start = req.query.start || 0;
    const limit = req.query.limit || 20;
    const from = req.query.from || null;
    return  Order.list(start, limit, from);
  },
  getByDoctorId: (req) => {
    const start = req.query.start || 0;
    const limit = req.query.limit || 20;
    const from = req.query.from || null;
    const id = req.payload.doctor_id;
    return Order.getByDoctorId(id, start, limit, from);
  },
  update: (req) => {
    return Order.update(req.params.id, req.payload);
  },
  getById: (req) => Order.getById(req.params.id),
  register: (req) => Order.register(req.payload),
  archive: (req) => Order.archive(req.params.id),
  approve: (req) => Order.approve(req.params.id),
  complete: (req) => Order.complete(req.params.id),
  getProblemDoc:(req)=>Order.getProblemDoc(req.params.id)
};
