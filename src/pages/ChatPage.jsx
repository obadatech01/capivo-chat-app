import React, { useEffect, useRef, useState } from "react";
import moment from 'moment';
import { Link, useNavigate, useParams } from "react-router-dom";
import ChatsAPI from "../api/ChatsAPI";
import UsersAPI from "../api/UsersAPI";
import baseURL from "../api/baseURL";

const ChatPage = () => {
  const navigate = useNavigate();
  const [singleChat, setSingleChat] = useState(''); 
  const { roomId } = useParams();
  const stateChats = ChatsAPI(roomId);
  const [chats, setChats] = stateChats.chats; 
  const stateUsers = UsersAPI();
  const [currentUser, setCurrentUser] = stateUsers.currentUser;
  const chatMessagesRef = useRef(null);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await baseURL.post(`/api/v1/chat/${roomId}`, {
        message: singleChat
      },{
        headers: {
          Authorization: `Bearer ${JSON.parse(
            localStorage.getItem("tokenCapivo")
          )}`,
        },
      })
      setSingleChat('')
    } catch (error) {
      console.log(error);
    }
  };

  const logout = () => {
    localStorage.removeItem("tokenCapivo");
    navigate('/login');
  }

  useEffect(() => {
    chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
  }, [chats]);

  return (
    <div className="chat-container">
      <header className="chat-header">
        <h1>
          <i className="fas fa-smile" /> Capivo Chat App
        </h1>
        <div>
        <Link to={"/room"} className="btn">
          Back
        </Link>
        {" "}
        <button onClick={logout} className="btn">
          Logout
        </button>
        </div>
      </header>
      <main className="chat-main">
        <div className="chat-sidebar">
          <h3>
            <i className="fas fa-comments" /> Room Name:
          </h3>
          <h2 id="room-name">{chats[0]?.room.name}</h2>
          <h3>
            <i className="fas fa-users" /> Users
          </h3>
          <ul id="users">
            {chats[0]?.room.members.map((user) => (
              <li key={user._id} className={user._id === currentUser?._id ? 'currentUser' : ''}>{user.name} {user._id === currentUser?._id ? ' - You' : ''}</li>
            ))}
            <li></li>
            <li></li>
          </ul>
        </div>
        <div className="chat-messages" ref={chatMessagesRef}>
          <div className="message">
            <p className="meta">
              Chat Bot <span>{moment().format('YYYY-mm-DD h:mm a')}</span>
            </p>
            <p className="text">
              Welcome in {chats[0]?.room.name} room.
            </p>
          </div>
          {
            chats.map(chat => <div key={chat._id} className="message">
            <p className="meta">
              {chat.sender._id === currentUser?._id ? 'You' : chat.sender.name} <span>{moment(chat.createdAt).format('YYYY-mm-DD h:mm a')}</span>
            </p>
            <p className="text">
              {chat.message}
            </p>
          </div>)
          }
        </div>
      </main>
      <div className="chat-form-container">
        <form id="chat-form" onSubmit={handleSubmit}>
          <input
            id="msg"
            type="text"
            value={singleChat}
            onChange={(e) => setSingleChat(e.target.value)}
            placeholder="Enter Message"
            required=""
            autoComplete="off"
          />
          <button className="btn" type="submit">
            <i className="fas fa-paper-plane" /> Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatPage;
