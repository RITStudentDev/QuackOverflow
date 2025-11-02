import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import { login_user } from "../mod/endpoints";
import '../styles/Login.css';

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();


    const handleLogin = async () => {
        const data = await login_user(username, password);
        if (data.tokenGenerated) {
            navigate('/');
        } else {
            alert(data.error || 'Invalid username or password');
        }
    };


    return (
        <div className="login-container">
            
            <h2 className="login-title">Login</h2>

            <input
                className="login-input"
                placeholder="username"
                onChange={(e) => setUsername(e.target.value)}
            />

            <input
                className="login-input"
                placeholder="password"
                onChange={(e) => setPassword(e.target.value)}
            />

            <button className="login-button" onClick={handleLogin}>
                Login
            </button>

        </div>
    )

};
