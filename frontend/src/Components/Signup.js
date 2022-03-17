import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = (props) => {
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({ name: "", username: "", password: "", cpassword: "" });

    const onchange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        if (credentials.password !== credentials.cpassword) {
            navigate('/signup');
            props.showAlert("Password must be same", "danger");
        }
        else {
            e.preventDefault();
            const { name, username, password } = credentials;
            // const response = await fetch('http://localhost:5000/api/auth/createuser', {
            const response = await fetch('https://notebook3.herokuapp.com/api/auth/createuser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, username, password })
            });
            const json = await response.json();
            console.log(json);

            if (json.success) {
                localStorage.setItem('auth-token', json.authToken);
                navigate('/');
                props.showAlert("Account created successfully", "success")
            }
            else {
                props.showAlert("Invalid Credentials", "danger")
            }
        }
    }
    return <div>
        <div className='container'>
            <form onSubmit={handleSubmit}>
                <h3>Create an account to use iNote</h3>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Full name</label>
                    <input type="text" className="form-control" id="name" name='name' value={credentials.name} onChange={onchange} minLength={3} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="username" className="form-label">Username</label>
                    <input type="text" className="form-control" id="username" name='username' value={credentials.username} onChange={onchange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" name='password' id="password" value={credentials.password} onChange={onchange} minLength={5} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="cpassword" className="form-label">Confirm password</label>
                    <input type="password" className="form-control" name='cpassword' id="cpassword" value={credentials.cpassword} onChange={onchange} required />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    </div>;
};

export default Signup;
