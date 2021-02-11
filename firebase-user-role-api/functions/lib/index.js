"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.api = exports.helloWorld = void 0;
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const routes_config_1 = require("./users/routes-config");
// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript
exports.helloWorld = functions.https.onRequest((request, response) => {
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
routes_config_1.routesConfig(app);
exports.api = functions.https.onRequest(app);
//# sourceMappingURL=index.js.map