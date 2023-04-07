import React, { useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import RoomsAPI from "../api/RoomsAPI";
import UsersAPI from "../api/UsersAPI";
// import { Link } from "react-router-dom";

const RoomPage = () => {
  const stateRooms = RoomsAPI();
  const [rooms, setRooms] = stateRooms.rooms;
  const stateUsers = UsersAPI();
  const [currentUser, setCurrentUser] = stateUsers.currentUser;
  const navigate = useNavigate();
  const roomRef = useRef();
  
  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    const room = rooms.find((room) => room.name === roomRef.current.value);

    navigate(`/chat/${room._id}`);
  }, [rooms]);
  
  return (
    <div className="join-container">
      <header className="join-header">
        <h1>
          <i className="fas fa-smile" /> Capivo Chat App
        </h1>
      </header>
      <main className="join-main">
        <form onSubmit={handleSubmit}>
          <div className="form-control">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              id="username"
              placeholder="Enter username..."
              required=""
              defaultValue={currentUser?.name}
            />
          </div>
          <div className="form-control">
            <label htmlFor="room">Room</label>
            <select ref={roomRef} name="room" id="room">
              {
                rooms.map(room => <option key={room._id} defaultValue={room.name}>{room.name}</option>)
              }
            </select>
          </div>
          <button type="submit" className="btn">
            Join Chat
          </button>
        </form>
      </main>
    </div>
  );
};

export default RoomPage;
