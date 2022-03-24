import React from 'react';
import LoginForm from '../components/auth/LoginFom';
import RegisterForm from '../components/auth/RegisterForm';
import { AuthContext } from '../contexts/authContext';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';


function Auth(props) {
    const { authorRouter } = props;
    const navigate = useNavigate();
    const { authState } = useContext(AuthContext);
    const { authLoading, isAuthenticated } = authState;
    let body
    if (authLoading) {
        body = (
            <div className="d-flex justify-content-center mt-2">
                <Spinner animation="border" variant="info" />
            </div>
        )
    }
    else if (isAuthenticated) 
    {
        return navigate("/dashboard");
    }
    else {
        body = (<>
            {
                authorRouter === 'login' && <LoginForm />
            }
            {
                authorRouter === 'register' && <RegisterForm />
            }
        </>)
    }

    return (
        <div className='landing'>
            <div className='dark-overlay'>
                <div className='landing-inner'>
                    <h1>Learn IT</h1>
                    <h4>Keep track of what you are learning</h4>
                    {body}
                </div>
            </div>
        </div>
    );
}

export default Auth;