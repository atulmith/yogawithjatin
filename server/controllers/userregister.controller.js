import sanitizeHtml from 'sanitize-html';
import Userregister from '../models/userregister';
import { trainUser } from '../util/facerecognition_util';

export function getSomething(req, res) {
  return res.status(200).end();
}
/**
 * Get all Userregisters
 * @param req
 * @param res
 * @returns void
 */
export function getUserregisters(req, res) {
  Userregister.find().exec((err, yogees) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ yogees });
  });
}

/**
 * Save a Userregister
 * @param req
 * @param res
 * @returns void
 */
export async function addUserregister(req, res) {
  console.log('addUserregister: ', req.body.yogee);
  // console.log('addUserregister: files', req.files);
  // const params = JSON.parse(req.body.yogee);
  const params = req.body.yogee;
  // const yogeefile = req.files[0];
  if (!params || !params.studname) {
    console.log('Sorry no params in request', req.body);
    res.status(403).end();
    return;
  }
  // if (!req.body.yogee.stud_name || !req.body.yogee.stud_address || !req.body.yogee.stud_emailid) {
  //   res.status(403).end();
  // }

  // trainUser(req.body.yogee.userpic,)

  // const newyogee = new Userregister(req.body.yogee);
  const newyogee = new Userregister(params);
  console.log('addUserregister', req.body.yogee);
  newyogee.batchid = params.batchid;
  newyogee.stud_name = sanitizeHtml(params.studname);
  newyogee.stud_address = sanitizeHtml(params.studaddress);
  newyogee.stud_pincode = sanitizeHtml(params.studpincode);
  newyogee.stud_mobilenumber = sanitizeHtml(params.studmobilenumber);
  newyogee.stud_emailid = sanitizeHtml(params.studemailid);
  newyogee.stud_pic = sanitizeHtml(params.studpic);
  newyogee.status = 'active';

  // code written to take Base64 string in params.studpic and pass to trainUser
  const resultoftrainuser = await trainUser(params.studpic, params.studname, params.batchid);
  // code written to take formdata object and pass to trainUser
  // const resultoftrainuser = await trainUser(yogeefile, params.studname, params.batchid);

  console.log('result of face recognition train', resultoftrainuser);

  // Let's sanitize inputs
  // newPost.title = sanitizeHtml(newPost.title);
  // newPost.name = sanitizeHtml(newPost.name);
  // newPost.content = sanitizeHtml(newPost.content);

  // newPost.slug = slug(newPost.title.toLowerCase(), { lowercase: true });
  // newPost.cuid = cuid();
  newyogee.save((err, saved) => {
    if (err) {
      res.status(500).send(err);
    } else {
      const batchid = saved.batchid;
      const { stud_name } = saved; // .stud_name;
      const the = {
        batchid,
        studname: stud_name,
        trainresult: resultoftrainuser,
      };

      res.json({ yogee: the });
    }
  });
}

/**
 * Get a single Userregister
 * @param req
 * @param res
 * @returns void
 */
export function getUserregister(req, res) {
  Userregister.findOne({ _id: req.params.id }).exec((err, yogee) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ yogee });
  });
}

/**
 * Delete a Userregister
 * @param req
 * @param res
 * @returns void
 */
export function deleteUserregister(req, res) {
  Userregister.findOne({ _id: req.params.id }).exec((err, yogee) => {
    if (err) {
      res.status(500).send(err);
    }

    yogee.remove(() => {
      res.status(200).end();
    });
  });
}
