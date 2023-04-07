import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import "./LoginPage.css";

const LoginPage = () => {
  const { login } =  useAuth();
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await login(phoneNumber, password);
      // Redirect to home page
      navigate('/room');
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div id="login-form">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="phoneNumber">Phone Number:</label>
        <input
          type="text"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          id="phoneNumber"
          name="phoneNumber"
          placeholder="Enter your phoneNumber"
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          id="password"
          name="password"
          placeholder="Enter your password"
        />
        <button type="submit" id="submitLogin">
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
