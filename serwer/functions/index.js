/* eslint-disable no-unused-vars */
/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const functions = require("firebase-functions");

const {onRequest} = require("firebase-functions/v2/https");

const logger = require("firebase-functions/logger");

const {onValueCreated} = require("firebase-functions/v2/database");

const admin = require("firebase-admin");
admin.initializeApp();

const cors = require("cors")({origin: true});
// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.use(cors);
app.use(bodyParser.json());


const secretAuthCode = "dupa1234";

// Middleware to check for valid authorization
const checkAuthorization = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || authHeader !== secretAuthCode) {
    return res.status(401).json({error: "Unauthorized"});
  }
  next();
};

// A test route to check the base
app.get("/baza", (req, res) => {
  return admin.database().ref("posts/").once("value", (snapshot) => {
    const event = snapshot.val();
    res.send(`
            <!doctype html>
            <html>
                <head>
                    <title>${event.name}</title>
                </head>
                <body>
                    <h1>Title ${"posts/"} in 
                    ${JSON.stringify(event, null, 4)}</h1>
                </body>
            </html>`,
    );
  });
});
app.get("/baza2", async (req, res) => {
  try {
    await admin.database().ref("posts/").child("dupaaaa").set("fjut");
    return res.status(200).send("dodano użytkownika");
  } catch (error) {
    return res.status(500).send("Internal Server Error");
  }
});

// Define a route to handle incoming POST requests
app.post("/kalendarz", checkAuthorization, async (req, res) =>{
  const dupa1="1";
  const {data, godzina, opis, nazwa} = req.body;
  if (!data || !nazwa) {
    return res.status(400).json({error: "Bad Request"});
  }
  if (!godzina ) {/* dodaj na cały dzień */}
  if (!opis ) {/* dodaj na cały dzień */}

  return res.status(200).send("poszlo :){"+dupa1+"}");
});

app.get("/helo", (req, res) =>{
  return res.status(200).send(("<marquee width=100>poszło</marquee>"));
});
app.get("/helo2", (req, res) =>{
  return res.status(200).json({message: "<marquee width=100>poszło</marquee>"});
});


app.on("error", (err) => {
  console.error("app error:", err);
});


exports.app = onRequest(app);
