import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = (props) => {
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({ username: "", password: "" });

    const onchange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

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
            props.showAlert("Logged in successfully", "success");
            localStorage.setItem('auth-token', json.authToken);
            localStorage.setItem('verified', json.verified);
            navigate('/');
        }
        else {
            props.showAlert("Invalid details", "danger")
        }
    }

    return <div>
        <form onSubmit={handleSubmit}>
            <h3>Login to continue using Note</h3>
            <div className="mb-3">
                <label htmlFor="username" className="form-label">Username</label>
                <input type="text" className="form-control" id="username" name='username' aria-describedby="emailHelp" value={credentials.username} onChange={onchange} />
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
