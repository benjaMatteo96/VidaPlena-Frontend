import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        password2: '',
        user_type: 'Client'
    });

    const { username, email, password, password2, user_type } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        console.log('Form Data:', formData); // Log de datos del formulario
        if (password !== password2) {
            console.log('Passwords do not match');
        } else {
            const newUser = {
                username,
                email,
                password,
                password2,
                user_type
            };

            try {
                const res = await axios.post('http://127.0.0.1:8000/api/register/', newUser);
                console.log(res.data);
            } catch (err) {
                console.error(err.response.data);
            }
        }
    };

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">Register</h1>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        className="form-control"
                        id="username"
                        placeholder="Username"
                        name="username"
                        value={username}
                        onChange={onChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email address</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        placeholder="Email address"
                        name="email"
                        value={email}
                        onChange={onChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        placeholder="Password"
                        name="password"
                        value={password}
                        onChange={onChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password2">Confirm Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password2"
                        placeholder="Confirm Password"
                        name="password2"
                        value={password2}
                        onChange={onChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="user_type">User Type</label>
                    <select
                        className="form-control"
                        id="user_type"
                        name="user_type"
                        value={user_type}
                        onChange={onChange}
                        required
                    >
                        <option value="Client">Client</option>
                        <option value="Employee">Employee</option>
                    </select>
                </div>
                <button type="submit" className="btn btn-primary btn-block">Register</button>
            </form>
        </div>
    );
};

export default Register;
