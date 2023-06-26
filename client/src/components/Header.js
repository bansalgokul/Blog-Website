import React, { useContext, useEffect } from 'react';
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faBars, faTimes, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import "../styles/headerStyles.css";
import { Link } from 'react-router-dom';
import { UserContext } from '../UserContext';

const Header = () => {

    const { userInfo, setUserInfo } = useContext(UserContext);

    useEffect(() => {
        fetch('http://localhost:4000/profile', {
            credentials: 'include',
        }).then(response => {
            response.json().then(userInfo => {
                setUserInfo(userInfo);
            });
        });
    }, []);

    const logout = async () => {
        fetch('http://localhost:4000/logout', {
            credentials: 'include',
            method: 'POST',
        });
        setUserInfo(null);
    }

    const username = userInfo?.username;

    return (
        <header className="header">
            <div className="left-section">
                <Link className="logo" to="/">My Blog</Link>
            </div>

            <div className="right-section">
                <nav className="nav">
                    <ul className="nav-ul">
                        {username ?
                            (
                                <>
                                    <li className="nav-li"><Link className="nav-a" to="/create">New Post</Link></li>
                                    <li className="nav-li"><Link className="nav-a" onClick={logout}>Logout</Link></li>
                                </>
                            )
                            : (
                                <>
                                    <li className="nav-li"><Link className="nav-a" to="/login">Login</Link></li>
                                    <li className="nav-li"><Link className="nav-a" to="/register">Register</Link></li>
                                </>
                            )}
                    </ul>
                </nav>
            </div>

        </header>
    )
}

export default Header