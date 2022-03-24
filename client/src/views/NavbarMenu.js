import React, { useContext} from 'react';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useNavigate  } from 'react-router-dom';
import { AuthContext } from '../contexts/authContext';
function NavbarMenu(props) {
    
    const {logoutUser, authState} = useContext(AuthContext);
    const navigate = useNavigate();
    const handlerLogout = async () => {
        await logoutUser();
        navigate("/login"); 
    }
    console.log("authState", authState);
    return (
        <Navbar className="shadow pd-2" variant='dark' bg='primary' expand="lg">
            <Navbar.Brand className="font-weight-border text-white" >
                LEARN IT
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />

            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link className="font-weight-bolder text-white" to='/dashboard' as={Link}>
                        Dash Board
                    </Nav.Link>
                    <Nav.Link className="font-weight-bolder text-white" to='/about' as={Link}>
                        About
                    </Nav.Link>
                </Nav>

                <Nav>
                    <Nav.Link className="font-weight-bolder text-white" disabled>
                        Welcome
                    </Nav.Link>
                    <Button variant="secondary" className="font-weight-bolder text-white" onClick={handlerLogout}>Logout</Button>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default NavbarMenu;