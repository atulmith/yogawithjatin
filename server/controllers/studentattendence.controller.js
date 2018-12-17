import sanitizeHtml from 'sanitize-html';
// import Studentattendence from '../models/studentattendence';
import { recogniseUser } from '../util/facerecognition_util';

export function getSomething(req, res) {
  return res.status(200).end();
}

/**
 * Returns the name of the user detected in the image.
 * @param {*} req
 * @param {*} res
 */
export async function takeattendenceofYogee(req, res) {
  console.log('takeattendenceofYogee: ', req.body.yogeeimagedetails);
  const params = req.body.yogeeimagedetails;
  if (!params || !params.batchid) {
    console.log('Sorry no params in request', req.body);
    res.status(403).end();
    return;
  }
  const studpic = sanitizeHtml(params.studpic);
  const batchid = sanitizeHtml(params.batchid);

  const result = await recogniseUser(studpic, batchid);
  console.log('takeattendenceofYogee result:', result);
  // result.usernamedetected,
  // result.usernameconfidence,
  // trainUser(req.body.yogee.userpic,)
  // const oldyogeeimagedetails = new Studentattendence();
  if (result) {
    res.json({ result });
  } else {
    res.status(500).send('error');
  }
}
