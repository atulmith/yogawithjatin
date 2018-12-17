import Studentbatchdetails from '../models/studentbatchdetails';

export function getSomething(req, res) {
  return res.status(200).end();
}

/**
 * Save a Userregister
 * @param req
 * @param res
 * @returns void
 */
export function addStudentbatchdetails(req, res) {
  console.log('addStudentbatchdetails: ', req.body.studbatch);
  if (!req.body.studbatch.batch_name) {
    res.status(403).end();
  }

  const newbatch = new Studentbatchdetails(req.body.studbatch);
  console.log('addStudentbatchdetails', req.body.studbatch, newbatch);
  // Let's sanitize inputs
  // newPost.title = sanitizeHtml(newPost.title);
  // newPost.name = sanitizeHtml(newPost.name);
  // newPost.content = sanitizeHtml(newPost.content);

  // newPost.slug = slug(newPost.title.toLowerCase(), { lowercase: true });
  // newPost.cuid = cuid();
  newbatch.save((err, saved) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json({ studbatch: saved });
    }
  });
}