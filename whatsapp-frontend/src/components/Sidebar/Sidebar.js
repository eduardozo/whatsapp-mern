import React, {useEffect, useState} from 'react';
import './Sidebar.css';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import IconButton from '@material-ui/core/IconButton';
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Avatar from '@material-ui/core/Avatar';
import SearchOutlined from '@material-ui/icons/SearchOutlined';
import SidebarChat from '../SidebarChat/SidebarChat';
import { useStateValue } from '../../reducer/StateProvider';
import DemoDialog from "../Modal/DemoDialog";

function Sidebar({ chatRooms }) {
    // eslint-disable-next-line no-unused-vars
    const [{ user }, dispatch] = useStateValue();
    const [input, setInput] = useState('');

    /*Search chatRoom by name*/
    useEffect(() => {
        const chatBoxes = document.querySelectorAll('.sidebar__chats > a');
        chatBoxes.forEach(ele => {
            const roomName = ele.querySelector('h2').textContent.toLowerCase();
            if (roomName.includes(input.toLowerCase())) {
                ele.classList.add('sidebarChat__find');
            } else {
                ele.classList.remove('sidebarChat__find');
            }
        });
    }, [input]);

    return (
        <div className="sidebar">

            {/*Sidebar Header*/}
            <div className="sidebar__header">
                <Avatar src={user?.photoURL}/>
                <div className="sidebar__headerRight">
                    <DemoDialog />
                    <IconButton>
                        <DonutLargeIcon />
                    </IconButton>
                    <IconButton>
                        <ChatIcon />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                </div>
            </div>

            {/*Sidebar Search*/}
            <div className="sidebar__search">
                <div className="sidebar__searchContainer">
                    <SearchOutlined />
                    <input value={input} onChange={(e) => setInput(e.target.value)}
                            type="text" placeholder="Search or start new chat"/>
                </div>
            </div>

            {/*Sidebar Chats*/}
            <div className="sidebar__chats">
                <SidebarChat addNewChat />
                {chatRooms.map(room => (
                    <SidebarChat
                        key={room._id}
                        id={room._id}
                        userName={room.messages.length > 0 &&
                                    room.messages[room.messages.length - 1].userName.split(' ')[0]}

                        roomName={room.roomName}

                        lastMessage={room.messages.length > 0 &&
                                     room.messages[room.messages.length - 1].message}
                    />
                ))}
            </div>
        </div>
    );
}

export default Sidebar;