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

    /*Listening for changes in DB*/
    changeStream.on('change', (change) => {
        if (change.operationType === 'insert') {
            const chatRoomDetails = change.fullDocument;
            pusher.trigger('chatroom', 'inserted',
                {
                    _id: chatRoomDetails._id,
                    roomName: chatRoomDetails.roomName,
                    messages: chatRoomDetails.messages
                });
        } else if (change.operationType === 'update') {
            const chatRoom = change.fullDocument;
            const roomId = chatRoom._id;
            const msgDetails = chatRoom.messages[chatRoom.messages.length - 1];
            pusher.trigger('chatroom', 'updated',
                {
                    roomId: roomId,
                    _id: msgDetails._id,
                    userId: msgDetails.userId,
                    userName: msgDetails.userName,
                    message: msgDetails.message,
                    timestamp: msgDetails.timestamp,
                    seen: msgDetails.seen
                });
        } else {
            console.error('Error triggering Pusher');
        }
    });
});


// API routes
app.get('/', (req, res) => {
    const __dirname = path.resolve();
    res.sendFile(path.join(__dirname, './whatsapp-frontend/build/index.html'));
});


/*Create a new chatRoom*/
app.post('/api/v1/chatroom/new', (req, res) => {
    const ChatRoomFields = req.body;

    ChatRoom.create(ChatRoomFields, (err, data) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(201).send(data);
        }
    });
});

/*Get all ChatRooms*/
app.get('/api/v1/chatroom/sync', (req, res) => {
    ChatRoom.find((err, data) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(data);
        }
    });
});

/*Create a new message*/
app.post('/api/v1/chatroom/message/new', (req, res) => {
    const roomId = req.body._id;
    const message = req.body.messages;
    ChatRoom.findOne({_id: roomId}).exec((err, chatRoom) => {
        if (err) {
            res.status(500).send(err);
        } else {
            chatRoom.messages.push(message);
            chatRoom.save();
            res.status(200).send(chatRoom);
        }
    });
});