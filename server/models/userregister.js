import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const userregisterSchema = new Schema({
  batchid: { type: 'String', required: false },
  stud_name: { type: 'String', required: true },
  stud_address: { type: 'String', required: true },
  stud_pincode: { type: 'String', required: true },
  stud_mobilenumber: { type: 'String', required: true },
  stud_emailid: { type: 'String', required: true },
  stud_weight_kg: { type: 'String', required: false },
  stud_height_ft: { type: 'String', required: false },
  stud_pic: { type: 'String', required: false },
  status: { type: 'String', required: true },
});

export default mongoose.model('Userregister', userregisterSchema, 'UserRegisterYWJ');
