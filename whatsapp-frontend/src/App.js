import React, { useEffect, useState } from 'react';
import './App.css';
import Sidebar from './components/Sidebar/Sidebar';
import Chat from './components/Chat/Chat';
import Pusher from 'pusher-js';
import axios from './config/axios';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './components/Login/Login';
import { useStateValue } from './reducer/StateProvider';

function App() {
    // eslint-disable-next-line no-unused-vars
    const [{ user }, dispatch] = useStateValue();
    const [rooms, setRooms] = useState([]);

    /*Fetch ChatRooms*/
    useEffect(() => {
        axios.get('/api/v1/chatroom/sync')
            .then(response => {
                setRooms(response.data);
            });
    }, []);


    /*Run Pusher script once, when Chat component loads.*/
    /*Gets new chatRoom in real-time*/
    useEffect(() => {
        const pusher = new Pusher(process.env.REACT_APP_PUSHER_APP_KEY, {
            cluster: 'us3'
        });

        const channel = pusher.subscribe('chatroom');
        channel.bind('inserted', (chatRoom) => {
            setRooms([...rooms, chatRoom]);
        });

        return () => {
            channel.unbind_all();
            channel.unsubscribe();
        };
    }, [rooms]);

    /*Received new message in-real-time*/
    useEffect(() => {
        const pusher = new Pusher(process.env.REACT_APP_PUSHER_APP_KEY, {
            cluster: 'us3'
        });

        const channel = pusher.subscribe('chatroom');
        channel.bind('updated', (message) => {
            setRooms(rooms.map(room => {
                    if (message.roomId === room._id) {
                        room.messages.push({
                            _id: message._id,
                            userId: message.userId,
                            userName: message.userName,
                            message: message.message,
                            timestamp: message.timestamp,
                            seen: message.seen
                        });
                    }
                    return room;
                })
            );
        });

        return () => {
            channel.unbind_all();
            channel.unsubscribe();
        };
    }, [rooms]);


    return (
        //BEM naming convention
        <div className="app">
            {!user ? (
                <Login />
            ) : (
                <div className="app__body">
                    <Router>
                        <Switch>
                            <Route path="/rooms/:roomId">
                                <Sidebar chatRooms={rooms} />
                                <Chat chatRooms={rooms} />
                            </Route>
                            <Route path="/">
                                <Sidebar chatRooms={rooms} />
                            </Route>
                        </Switch>
                    </Router>
                </div>
            )}
        </div>

    );
}

export default App;
