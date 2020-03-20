// Imports
import express from 'express';
import mongoose from 'mongoose';
import ChatRoom from './model/db.chatRooms.js';
import Pusher from "pusher";
import cors from 'cors';
import path from 'path';

import { createRequire } from 'module';
const require = createRequire(import.meta.url);
require('dotenv').config();


// Chat config
const app = express();
const port = process.env.PORT || 9000;

const pusher = new Pusher({
    appId: process.env.SERVER_PUSHER_APP_ID,
    key: process.env.SERVER_PUSHER_KEY,
    secret: process.env.SERVER_PUSHER_SECRET,
    cluster: process.env.SERVER_PUSHER_CLUSTER,
    encrypted: true
});


// Middleware
app.use(express.json());
app.use(express.static('whatsapp-frontend/build'));

/*Cross-Origin Resource Sharing*/
app.use(cors());


// DB config
const admin = process.env.SERVER_MONGODB_ADMIN;
const password = process.env.SERVER_MONGODB_PASSWORD;
const dataBaseName = process.env.SERVER_MONGODB_DATABASE_NAME;
const connectionUrl = `mongodb+srv://${admin}:${password}@cluster0.15djf.mongodb.net/${dataBaseName}?retryWrites=true&w=majority`;

mongoose.connect(connectionUrl, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console
    .error
    .bind(console, 'DB: Connection Error'));
db.once('open', () => {
    console.log('DB connected.')

    const msgCollection = db.collection('chatrooms');
    const changeStream = msgCollection.watch(
        [],
        { fullDocument : "updateLookup" }
    );
});