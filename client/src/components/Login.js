import React, { useContext } from 'react';
import "../styles/loginStyle.css"
import { useState } from 'react';
import { Navigate } from "react-router-dom";
import { UserContext } from '../UserContext';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);
    const { setUserInfo } = useContext(UserContext);

    const login = async (ev) => {
        ev.preventDefault();
        const response = await fetch('https://blog-gokul.onrender.com/login', {
            method: "POST",
            body: JSON.stringify({ username, password }),
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
        })

        if (response.ok) {
            response.json().then(userInfo => {
                setUserInfo(userInfo);
                setRedirect(true);
            });

        } else {
            alert("Login Unsuccessful");
        }
    }

    if (redirect) {
        return <Navigate to={"/"} />
    }

    return (
        <div className='login'>
            <h1 className='login-h1'>Login</h1>
            <form action="" className='loginForm' onSubmit={login}>
                <label htmlFor="username" className='loginForm-label'>
                    <input type="text"
                        placeholder='username'
                        id='username'
                        name='username'
                        className='loginForm-input'
                        value={username}
                        onChange={ev => setUsername(ev.target.value)}
                        required />
                </label>
                <label htmlFor="password" className='loginForm-label'>
                    <input type="password"
                        placeholder='password'
                        id='password'
                        name='password'
                        className='loginForm-input'
                        value={password}
                        onChange={ev => setPassword(ev.target.value)}
                        required />
                </label>
                <button type="submit" className='loginForm-submit'>Login</button>
            </form>
        </div>
    )
}

export default Login