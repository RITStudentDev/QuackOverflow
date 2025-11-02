import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import { login_user } from "../mod/endpoints";

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
            <input 
            className="username-input"
            placeholder="username"
            onChange={(e) => setUsername(e.target.value)}
            ></input>
            <input 
            className="password-input"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
            ></input>
            <button 
            className="login-button"
            onClick={handleLogin}
            >Login</button>
        </div>
    )

};