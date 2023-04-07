import {useState, useEffect} from 'react';
import baseURL from './baseURL';


function RoomsAPI() {
  const [rooms, setRooms] = useState([]);

    useEffect(() =>{
        const getRooms = async () => {
            const res = await baseURL.get('/api/v1/room',{
              headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem("tokenCapivo"))}` },
            })
            setRooms(res.data.data)
        }
        getRooms()
    },[rooms])

    const stateRooms = {
      rooms: [rooms, setRooms]
    }
    
    return stateRooms
}

export default RoomsAPI;
