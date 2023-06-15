import React, { useState } from 'react';
import "../styles/registerStyle.css"
import { Navigate } from 'react-router-dom';

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);

    const register = async (ev) => {
        ev.preventDefault();
        const response = await fetch('https://blog-gokul.onrender.com/register', {
            method: "POST",
            body: JSON.stringify({ username, password }),
            headers: { 'Content-Type': 'application/json' },
        })

        if (response.status === 200) {
            setRedirect(true);
        } else {
            alert("Registration Unsuccessful");
        }
    }

    if (redirect) {
        return <Navigate to={"/login"} />
    }

    return (
        <div className='register'>
            <h1 className='register-h1'>Register</h1>
            <form action="" className='registerForm' onSubmit={register}>
                <label htmlFor="username" className='registerForm-label'>
                    <input type="text"
                        placeholder='username'
                        id='username'
                        name='username'
                        className='registerForm-input'
                        value={username}
                        onChange={ev => setUsername(ev.target.value)}
                        required />
                </label>
                <label htmlFor="password" className='registerForm-label'>
                    <input type="password"
                        placeholder='password'
                        id='password'
                        name='password'
                        className='registerForm-input'
                        value={password}
                        onChange={ev => setPassword(ev.target.value)}
                        required />
                </label>
                <button type="submit" className='registerForm-submit'>Register</button>
            </form>
        </div>
    )
}

export default Register