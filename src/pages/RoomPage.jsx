import React, { useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import UsersAPI from "../api/UsersAPI";
// import { Link } from "react-router-dom";

const RoomPage = () => {
  const stateUsers = UsersAPI();
  const [currentUser, setCurrentUser] = stateUsers.currentUser;
  const [users, setUsers] = stateUsers.users;
  const navigate = useNavigate();
  const userRef = useRef();
  
  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    const user = users.find((user) => user.name === userRef.current.value);

    navigate(`/chat/${user._id}`);
  }, [users]);
  
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
            <label htmlFor="room">Chat With</label>
            <select ref={userRef} name="user" id="user">
              {
                users?.map(user => <option key={user._id} defaultValue={user.name}>{user.name}</option>)
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
