import React, { useContext, useEffect } from 'react';
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faBars, faTimes, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import "../styles/headerStyles.css";
import { Link } from 'react-router-dom';
import { UserContext } from '../UserContext';

const Header = () => {

    const { userInfo, setUserInfo } = useContext(UserContext);

    useEffect(() => {
        const fetchData = async () => {
            const responseJson = await fetch("http://localhost:4000/profile", {
                credentials: "include",
            });
            if (responseJson.ok) {
                const responseData = await responseJson.json();
                setUserInfo(responseData);
            }
        }
        fetchData();
    }, []);

    const logout = async () => {
        await fetch('http://localhost:4000/logout', {
            method: 'POST',
            credentials: 'include',
        })
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