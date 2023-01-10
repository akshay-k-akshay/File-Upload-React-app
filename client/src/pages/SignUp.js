import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { signup } from '../api/api';

function SignUp() {
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
    const [name, setName] = useState("");

    async function submit(e) {
        e.preventDefault();
        if (!email) {
            return alert("Email is required")
        }
        if (!password) {
            return alert("Password is required")
        }
        if (!name) {
            return alert("Name is required")
        }
        const result = await signup({ email, password, name })
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
                <form onSubmit={submit}>
                    <h1>Login</h1>
                    <div className="content">
                        <div className="input-field">
                            <input type="name" placeholder="Name" onChange={(e) => setName(e.target.value.trim())} />
                        </div>
                        <div className="input-field">
                            <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value.trim())} />
                        </div>
                        <div className="input-field">
                            <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value.trim())} />
                        </div>
                        <input className='btn btn-outline-success' type="submit" value={"submit"} />
                        <br />
                        <Link to="/signin" className="link">Already have Account?</Link>
                    </div>
                </form>
            </div>
        </>
    )
}

export default SignUp