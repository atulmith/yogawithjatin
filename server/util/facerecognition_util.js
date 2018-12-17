/**
 *A UTIL FOR FACE RECOGNITION USING Kairos api.
 */

import Kairos from 'kairos-api';
const clientface = new Kairos('37e5834c', 'bbd13a8487963b453ccc9a7bc8c863ad');

/**
 * List of all teh galleries in the Kairos API.
 */
export async function listOfGallery() {
  const gallerylist = await clientface.galleryListAll();
  console.log('at source list=', gallerylist);
  return gallerylist;
}

/**
 * To train the API to add a new user's image
 * @param {*} base64text
 * @param {*} username
 * @param {*} galleryname
 */
export async function trainUser(base64text, username, galleryname) {

  const params = {
    image: base64text,
    subject_id: username,
    gallery_name: galleryname,
    selector: 'SETPOSE',
  };
  try {
    const enrollreply = await clientface.enroll(params);
    return enrollreply;
  } catch (error2) {
    return {
      error: error2,
    };
  }
}

/**
 * To recognise the user whose image is send thru base64text in the
 * Gallery 'galleryname'
 * @param {*} base64text
 * @param {*} galleryname
 */
export async function recogniseUser(base64text, galleryname) {

  const params = {
    image: base64text,
    gallery_name: galleryname,
    selector: 'SETPOSE',
  };
  try {
    const recognisereply = await clientface.recognize(params);
    console.log('recognisereply', recognisereply);
    const jsonreply = JSON.parse(recognisereply);

    const bodyresult = jsonreply.body;
    const arrimages = bodyresult.images;

    const usernamedetected = arrimages[0].transaction.subject_id;
    const usernameconfidence = arrimages[0].transaction.confidence;

    const returndetected = {
      usernamedetected,
      usernameconfidence,
    };

    return returndetected;
  } catch (error2) {
    return {
      error: error2,
    };
  }
}
