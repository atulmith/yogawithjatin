import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const studentbatchdetailsSchema = new Schema({
  batch_name: { type: 'String', required: false },
  batch_start_time: { type: 'String', required: false },
  batch_end_time: { type: 'String', required: false },
  status: { type: 'String', required: false },
});

export default mongoose.model('Studentbatchdetails', studentbatchdetailsSchema);
