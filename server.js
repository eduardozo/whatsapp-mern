// Imports
import express from 'express';
import Pusher from "pusher";

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