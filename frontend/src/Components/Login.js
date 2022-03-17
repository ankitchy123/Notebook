import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = (props) => {
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({ email: "", password: "" });

    const onchange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        // const response = await fetch('https://i--notebook.herokuapp.com/api/auth/login', {
        const response = await fetch('http://localhost:5000/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        });
        const json = await response.json();
        console.log(json);

        if (json.success) {
            if (json.verified) {
                props.showAlert("Logged in successfully", "success");
                localStorage.setItem('auth-token', json.authToken);
                localStorage.setItem('verified', json.verified);
                navigate('/');
            }
            else if (!json.verified) {
                const { email } = credentials;
                localStorage.setItem('email', email);
                navigate('/emailverification');
                props.showAlert("Please verify your account", "warning")
            }
        }
        else {
            props.showAlert("Invalid details", "danger")
        }
    }

    return <div>
        <form onSubmit={handleSubmit}>
            <h3>Login to continue using iNote</h3>
            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email address</label>
                <input type="email" className="form-control" id="email" name='email' aria-describedby="emailHelp" value={credentials.email} onChange={onchange} />
                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" className="form-control" name='password' id="password" value={credentials.password} onChange={onchange} />
            </div>
            <button type="submit" className="btn btn-primary" >Submit</button>
        </form>
    </div>;
};

export default Login;
