import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link, useNavigate } from 'react-router-dom';
import React, { useState, useContext } from 'react';
import { AuthContext } from '../../contexts/authContext';
import AlertMessage from '../layout/AlertMessage';
function RegisterForm(props) {
    const [registerForm, setRegisterForm] = useState({
        username: '',
        password: '',
        confirmPassword: '',
    });
    const { username, password, confirmPassword } = registerForm;
    const [alert, setAlert] = useState(null);
    const { registerUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const handleChange = (e) => {
        setRegisterForm({ ...registerForm, [e.target.name]: e.target.value });
    }

    const register = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setAlert({ type: "danger", message: "Password and Confirm Password don't match" });
            setTimeout(() => setAlert(null), 3000);
            return;
        }
        try {
            const registerData = await registerUser(registerForm);
            if (!registerData.success) {
                // 
                setAlert({ type: "danger", message: registerData.message });
                setTimeout(() => setAlert(null), 3000);
            }
            else {
                setAlert({ type: "success", message: registerData.message });
                await setTimeout(() => setAlert(null), 3000);
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <>
            <Form onSubmit={register}>
                <AlertMessage info={alert} />

                <Form.Group className="mb-3">
                    <Form.Control
                        type="text"
                        placeholder="Username"
                        name="username"
                        required
                        value={username}
                        onChange={(e) => handleChange(e)}
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        name="password"
                        required
                        value={password}
                        onChange={(e) => handleChange(e)}
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Control
                        type="password"
                        placeholder="Confirm Password"
                        name="confirmPassword"
                        required
                        value={confirmPassword}
                        onChange={(e) => handleChange(e)}
                    />
                </Form.Group>
                <Button variant='success' type="submit" className="mb-4">Register</Button>
            </Form>
            <p>
                Already an account???
                <Link to="/login">
                    <Button variant='info' size="sm" className="ml-2">Login</Button>
                </Link>
            </p>
        </>
    );
}

export default RegisterForm; 