import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

import { signin } from '../api/api';

function SignIn() {
    const history = useNavigate();
    async function isLoggedIn() {
        const token = localStorage.getItem("token");
        if (token) {
            history("/");
            return
        }
    }

    useEffect(() => {
        isLoggedIn();
    }, []);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    async function submit() {
        if (!email) {
            return alert("Email is required")
        }
        if (!password) {
            return alert("Password is required")
        }
        const result = await signin({ email, password })
        // eslint-disable-next-line
        if (result.statusCode != 200) {
            alert(result.message)
            return
        }
        localStorage.setItem("token", result.data.token)
        history("/");
    }

    return (
        <>
            <div className="login-form">
                <h1>Login</h1>
                <div className="content">
                    <div className="input-field">
                        <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value.trim())} />
                    </div>
                    <div className="input-field">
                        <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value.trim())} />
                    </div>

                    <button onClick={() => { submit() }} className='btn btn-outline-success'>Submit</button>
                    <br />
                    <Link to="/signup" className="link">Create New Account </Link>
                </div>
            </div>
        </>
    )
}

export default SignIn