import React, {useState} from "react";
import {useNavigate} from "react-router-dom";

export default function Login() {
    const [formData, setFormData] = useState({
        username: "",
        password: ""
    });
    const navigate = useNavigate();

    return (
        <div className="login-container">
            <input 
            className="username-input"
            placeholder="username"
            ></input>
            <input 
            className="password-input"
            placeholder="password"
            ></input>
            <button 
            className="login-button"
            placeholder="login"
            onClick={() => navigate("/")}>

            </button>
        </div>
    )
}