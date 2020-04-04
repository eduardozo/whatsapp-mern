import React from 'react';
import './SidebarChat.css'
import Avatar from '@material-ui/core/Avatar';
import axios from "../../config/axios";
import { Link } from 'react-router-dom';

function SidebarChat({ id, userName, roomName, lastMessage, addNewChat }) {

    /*send a new chatRoom request*/
    const createChat = async () => {
        const roomName = prompt('Please enter name chat');

        if (roomName) {
            await axios.post('/api/v1/chatroom/new', {
                roomName: roomName,
                messages: []
            });
        }
    };

    return !addNewChat ? (
        <Link to={`/rooms/${id}`}>
            <div className="sidebarChat">
                <Avatar src={`https://avatars.dicebear.com/api/human/${id}.svg`}/>
                <div className="sidebarChat__info" key={id}>
                    <h2>{roomName}</h2>
                    {lastMessage
                        ? <p>{`${userName}: ${lastMessage.slice(0, 30)}...`}</p>
                        : <p>New chat room ✨</p>
                    }

                </div>
            </div>
        </Link>
    ) : (
        <div onClick={createChat} className='sidebarChat'>
            <h2>Add new chat</h2>
        </div>
    );
}

export default SidebarChat;