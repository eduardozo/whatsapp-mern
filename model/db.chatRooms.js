import mongoose from 'mongoose';

const whatsappSchema = mongoose.Schema({
    roomName: String,
    messages: [{
        userId: String,
        userName: String,
        message: String,
        timestamp: { type: Date, default: Date.now },
        seen: Boolean
    }]
});

export default mongoose.model('chatrooms', whatsappSchema);