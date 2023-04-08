import {useState, useEffect} from 'react';
import baseURL from './baseURL';
import UsersAPI from './UsersAPI';


function ChatsAPI(userId) {
  const stateUsers = UsersAPI();
  const [token, setToken] = stateUsers.token;
  const [chats, setChats] = useState([]);

    useEffect(() =>{
        const getChats = async () => {
            const res = await baseURL.get(`/api/v1/chat/${userId}`,{
              headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem("tokenCapivo"))}` },
            })
            setChats(res.data.data)
        }
        getChats()
    },[])

    const stateChats = {
      chats: [chats, setChats]
    }
    
    return stateChats
}

export default ChatsAPI;
