import { Outlet, Link } from "react-router-dom";
import React from 'react';
const Layout = () => {
    return (
        <>
            <nav>
                <ul>
                    <li>
                        <Link to="/">Login</Link>
                    </li>
                    <li>
                        <Link to="/changepassword">Change Password</Link>
                    </li>

                </ul>
            </nav>

            <Outlet />
        </>
    )
};

export default Layout;