const mongo = require('mongoose')
const {Schema} =  mongo;

mongo.connect('mongodb://localhost:27017/hospital')

const DoctorSchema = Schema({
    name: String,
    email: Email
})
const Doctor = mongo.model(
    'Doctors',
    { name: String },
    { email: String },
    { Designation: String }
)

(new Doctor({ name: "Samrat" },
    { email: "samrat.biz19@gmail.com" },
    { Designation: "Physicst" }
)).save();

(new Doctor({ name: "Kaushal" },
    { email: "kausha.biz19@gmail.com" },
    { Designation: "Biologist" }
)).save();