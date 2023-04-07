import {useState, useEffect} from 'react';
import baseURL from './baseURL';
import UsersAPI from './UsersAPI';


function ChatsAPI(roomId) {
  const stateUsers = UsersAPI();
  const [token, setToken] = stateUsers.token;
  const [chats, setChats] = useState([]);

    useEffect(() =>{
        const getChats = async () => {
            const res = await baseURL.get(`/api/v1/chat/${roomId}`,{
              headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem("tokenCapivo"))}` },
            })
            setChats(res.data.data)
        }
        getChats()
    },[chats, roomId, token])

    const stateChats = {
      chats: [chats, setChats]
    }
    
    return stateChats
}

export default ChatsAPI;
