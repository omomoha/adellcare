import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as express from 'express';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';
import { routesConfig } from './users/routes-config';

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

export const helloWorld = functions.https.onRequest((request, response) => {
    response.send("Hello from Firebase!");
});

let serviceAccount = require("./users/serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://adellcare.firebaseio.com",
  storageBucket: "adellcare.appspot.com"
});

const app = express();
app.use(bodyParser.json());
app.use(cors({ origin: true }));

routesConfig(app)

export const api = functions.https.onRequest(app);
