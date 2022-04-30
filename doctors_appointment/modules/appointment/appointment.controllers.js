const AppointmentModel = require("./appointment.model");
const DataUtils = require("../../helpers/data");
const readdir = require("@jsdevtools/readdir-enhanced");
const fs = require('fs');

const Appointment = {
  async add(data) {
    return await this.register(data);
  },
  async list() {
    var res = await AppointmentModel.find().lean();

    const promise = res.map(r=>{
      r.files = fs.readdirSync('./modules/appointment/problems/').filter(f=>f.startsWith(r._id));
    })
    return Promise.all(promise).then(()=>{
      return res;
    }).catch(err=>{
      return res;
    })
  },

    // const $match = { is_archived: false };
    // if (from) $match.from = { $regex: new RegExp(`${from}`), $options: "gi" };
    // const query = [{ $match }];

    // return DataUtils.paging({
    //   start,
    //   limit,
    //   sort: { created_at: -1 },
    //   model: AppointmentModel,
    //   query,
    // });
  async getByDoctorId(id, start, limit, from) {
    const $match = { is_archived: false, doctor_id: id };
    if (from) $match.from = { $regex: new RegExp(`${from}`), $options: "gi" };
    const query = [{ $match }];

    return DataUtils.paging({
      start,
      limit,
      sort: { created_at: -1 },
      model: AppointmentModel,
      query,
    });
  },
  async getById(_id) {
    return AppointmentModel.findOne({ _id, is_archived: false });
  },

  async register(data) {
    const ext = data.problem_doc.hapi['filename'].split('.')[1];
    // const user = await AppointmentModel.findOne({ email: data.email });
    // const user1 = await AppointmentModel.findOne({ phone: data.phone });
    // if (user) {
    //   throw { message: "Email already registered", code: 400 };
    // }
    // if (user1) {
    //   throw { message: "Phone already registered", code: 400 };
    // }
    const res = await AppointmentModel.create(data);
    fs.writeFileSync(__dirname +  `/problems/${res._id}.${ext}`, Buffer(data.problem_doc._data));
    return 0;
  },
  async update(id, data) {
    const user = await AppointmentModel.findById(id);
    const user2 = await AppointmentModel.findOne({ email: data.email });
    if (!user) {
      throw { message: "Prescription not found", code: 4000 };
    } else if (data.email == user.email) {
      return await AppointmentModel.findByIdAndUpdate(id, data);
    } else if (user2) {
      throw { message: "Dublicate email", code: 4000 };
    } else {
      return await AppointmentModel.findByIdAndUpdate(id, data);
    }
  },
  async getProblemDoc(id){
    let files = await readdir.async(__dirname + '/problems');
    for(var i in files){
      console.log(files[i]);
      if(files[i].split('.')[0] == id.toString()){
        const ret_file = fs.readFileSync(__dirname + '/problems/' + files[i]);
        return {file: ret_file, name: files[i]};
      }
    }
    throw { message: "document not found", code: 4000 };
  },

  async approve(id) {
    return AppointmentModel.findOneAndUpdate(
      { _id: id, is_archived: false },
      { approved: true }
    );
  },
  async archive(id) {
    return AppointmentModel.findOneAndUpdate(
      { _id: id, is_archived: false },
      { is_archived: true }
    );
  },
  async complete(id) {
    return AppointmentModel.findOneAndUpdate(
      { _id: id, is_archived: false },
      { completed: true }
    );
  },
};

module.exports = {
  Appointment,
  add: (req) => Appointment.add(req.payload),
  list: (req) => {
    const start = req.query.start || 0;
    const limit = req.query.limit || 20;
    const from = req.query.from || null;
    return Appointment.list(start, limit, from);
  },
  getByDoctorId: (req) => {
    const start = req.query.start || 0;
    const limit = req.query.limit || 20;
    const from = req.query.from || null;
    const id = req.payload.doctor_id;
    return Appointment.getByDoctorId(id, start, limit, from);
  },
  update: (req) => {
    return Appointment.update(req.params.id, req.payload);
  },
  getById: (req) => Appointment.getById(req.params.id),
  register: (req) => Appointment.register(req.payload),
  archive: (req) => Appointment.archive(req.params.id),
  approve: (req) => Appointment.approve(req.params.id),
  complete: (req) => Appointment.complete(req.params.id),
  getProblemDoc:(req)=>Appointment.getProblemDoc(req.params.id)
};
