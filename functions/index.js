const functions = require("firebase-functions");
const admin = require("firebase-admin");
//const sgMail = require("@sendgrid/mail");

admin.initializeApp();

// const API_KEY = functions.config().sendgrid.key;
// const TEMPLATE_ID = functions.config().sendgrid.template;
//sgMail.setApiKey(API_KEY);

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//

exports.moveTempToEntries = functions.firestore
  .document("temp/{docId}")
  .onUpdate(async (change, context) => {
    try {
      const entriesDb = admin.firestore().collection("entries");
      const tempDb = admin.firestore().collection("temp");

      //get all data
      let doc = await tempDb.doc(context.params.docId).get();
      if (!doc.exists) {
        console.log("doc doesnt exist");
        return;
      }
      let data = doc.data();

      //if pic url is there
      if (!(data.paypic && data.paypic.url)) {
        console.log("paypic doesnt exist");
        return;
      }

      //write to entries db

      await entriesDb.doc(context.params.docId).set({
        ...data
      });

      //delete temp data
      await tempDb.doc(context.params.docId).delete();

      //send mail
      // const msg = {
      //   to: data.email,
      //   from: "productions.sharp.nerd@gmail.com",
      //   templateId: TEMPLATE_ID,
      //   dynamic_template_data: {
      //     username: data.leader_name
      //   }
      // };
      // return sgMail.send(msg);
    } catch (error) {
      console.log(error);
    }
  });
