import React, { useEffect, useState } from 'react';
import './Chat.css';
import { IconButton, Avatar } from '@material-ui/core';
import { AttachFile, InsertEmoticon, Mic, MoreVert, SearchOutlined } from '@material-ui/icons';
import axios from '../../config/axios';
import { useParams } from 'react-router-dom';
import { useStateValue } from '../../reducer/StateProvider';

function Chat({ chatRooms }) {
    // eslint-disable-next-line no-unused-vars
    const [{ user }, dispatch] = useStateValue();
    const { roomId } = useParams();
    const [input, setInput] = useState('');
    const [roomName, setRoomName] = useState('');
    const [messages, setMessages] = useState([]);
    const lastSeen = messages[messages.length -1]?.timestamp;

    /*Get chat messages by roomId*/
    useEffect(() => {
        // eslint-disable-next-line array-callback-return
        chatRooms.map((room) => {
            if (roomId === room._id) {
                setRoomName(room.roomName);
                setMessages(room.messages);
                return 0;
            }
        });
    }, [roomId, chatRooms]);


    /*Send a new message request*/
    const sendMessage = async e => {
        e.preventDefault();

        await axios.post('/api/v1/chatroom/message/new', {
            _id: roomId,
            messages: {
                userId: user ? user.uid : '212',
                userName: user ? user.displayName : 'Anonymous',
                message: input,
                seen: false
            }
        });

        setInput('');
    };

    /*Keeps chat container scrolled bottom*/
    useEffect(() => {
       const chatBody = document.querySelector('.chat__body');
       chatBody.scrollTop = chatBody.scrollHeight;
    });


    return (
        <div className="chat">
            {/*Chat Header*/}
            <div className="chat__header">

                <Avatar src={`https://avatars.dicebear.com/api/human/${roomId}.svg`}/>

                <div className="chat__headerInfo">
                    <h3>{roomName}</h3>
                    {lastSeen ?
                        <p>Last seen {new Date(lastSeen).toUTCString()}</p> :
                        <p>Sent the first message</p>
                    }
                </div>

                <div className="chat__headerRight">
                    <IconButton>
                        <SearchOutlined />
                    </IconButton>
                    <IconButton>
                        <AttachFile />
                    </IconButton>
                    <IconButton>
                        <MoreVert />
                    </IconButton>
                </div>
            </div>

            {/*Chat Body*/}
            <div className="chat__body">
                {messages.map(message => (
                    (message) &&
                    <p className={`chat__message ${message.userId === user.uid && 'chat__receiver'}`} key={message._id}>
                        <span className="chat__name">{message.userName}</span>
                        {message.message}
                        <span className="chat__timestamp">{(lastSeen) && new Date(lastSeen).toUTCString()}</span>
                    </p>
                ))}
            </div>


            {/*Footer*/}
            <div className="chat__footer">
                <InsertEmoticon />

                <form>
                    <input value={input} onChange={(e) => setInput(e.target.value)}
                           placeholder="Type a message" type="text"/>
                    <button onClick={sendMessage} type="submit">Send a message</button>
                </form>

                <Mic />
            </div>

        </div>
    );
}

export default Chat;