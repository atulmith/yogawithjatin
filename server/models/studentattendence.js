import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const studentattendenceSchema = new Schema({
  stud_id: { type: 'String', required: false },
  batch_id: { type: 'String', required: false },
  att_day: { type: 'Number', required: false },
  att_month: { type: 'Number', required: false },
  att_year: { type: 'Number', required: false },
  att_ispresent: { type: 'Boolean', required: false },
});

export default mongoose.model('Studentattendence', studentattendenceSchema);
