import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const EmailVerify = (props) => {
    const navigate = useNavigate();
    const [verificationCode, setVerificationCode] = useState("");

    const onchange = (e) => {
        setVerificationCode(e.target.value)
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        const email = localStorage.getItem('email');
        localStorage.removeItem('email');
        const response = await fetch('https://i--notebook.herokuapp.com/api/auth/createuser', {
            // const response = await fetch('http://localhost:5000/api/auth/createuser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, verificationCode })
        });
        const json = await response.json();

        if (json.success) {
            localStorage.setItem('auth-token', json.authToken);
            localStorage.setItem('verified', json.verified);
            navigate('/');
            props.showAlert("Account created successfully", "success")
        }
        else {
            props.showAlert("Incorrect verification code, please try again", "danger")
        }
    }

    return <div className='container'>
        <h2>Please check your <a target="__blank" href='https://mail.google.com/mail/u/0/#inbox'>email</a> for the code.</h2>
        <input className="form-control" type="text" name="verificationCode" id="verificationCode" onChange={onchange} />
        <button className='btn btn-primary' onClick={handleSubmit} type="submit">Submit</button>
    </div>;
};

export default EmailVerify;
