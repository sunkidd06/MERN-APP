import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useContext } from 'react';
import { AuthContext } from '../../contexts/authContext'
import AlertMessage from '../layout/AlertMessage';

function LoginForm(props) {
    const [loginForm, setLoginForm] = useState({
        username: '',
        password: '',
    });
    const [alert, setAlert] = useState(null);
    const { loginUser } = useContext(AuthContext);
    let navigate = useNavigate();

    const handleOnchangeLoginForm = (e) => {
        setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
    }

    const login = async event => {
        event.preventDefault();
        try {
            const loginData = await loginUser(loginForm);
            console.log("login form da dc chay ne day la login data");
            console.log(loginData);
            if(loginData.success) {
                console.log("chuyen trang sang dashboard");
                navigate("/dashboard");
            }
            else{
                setAlert({type:"danger", message: loginData.message});
                setTimeout( () => {
                    setAlert(null);
                }, 3000);
            }
        } catch (error) {

        }
    }
    return (
        <>
            <Form onSubmit={login}>
                <AlertMessage info={alert}/>
                <Form.Group className="mb-3">
                    <Form.Control type="text" placeholder="Username" name="username" onChange={(e) => handleOnchangeLoginForm(e)} required />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Control type="password" placeholder="Password" name="password" onChange={(e) => handleOnchangeLoginForm(e)} required />
                </Form.Group>
                <Button variant='success' type="submit" className="mb-4" >Login</Button>
            </Form>
            <p>
                Don't have an account???  
                <Link to="/register" style={{marginLeft:"4px"}}>
                    {/* <Button variant='info' size="sm" className="ml-4">Register</Button> */}
                          Register
                </Link>
            </p>
        </>
    );
}

export default LoginForm; 