import React, { useContext, useEffect } from 'react';
import Button from "react-bootstrap/Button";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Toast from "react-bootstrap/Toast";
import Spinner from "react-bootstrap/Spinner";
import addIcon from "../assets/add.svg";
import AddPostModal from '../components/posts/AddPostModal';
import SinglePost from "../components/posts/SinglePost";
import { PostContext } from '../contexts/postContext';
import NavBar from './NavbarMenu';
import UpdatePostModal from '../components/posts/UpdatePostModal';
function DashBoard(props) {
    // Contexts
    const { postState, getAllPost, showModal, setShowModal, showToast, setShowToast } = useContext(PostContext);

    const { post,posts, postLoading } = postState;
    const { show, type, message } = showToast;
    console.log(posts);
    console.log(postLoading);
    useEffect(() => getAllPost(), []);
    let body = null;
    if (postLoading) {
        body = (
            <div className="spinner-container">
                <Spinner animation="border" variant='info'></Spinner>
            </div>
        )
    }
    else if (posts.length === 0) {
        console.log("render dashboard  length = 0");
        body = (
            <div>
                <Card className="text-center mx-5 my-5">
                    <Card.Header animation="border" variant='info'>
                        Hiiii
                    </Card.Header>
                    <Card.Body>
                        <Card.Title>
                            Welcom to Learn IT
                        </Card.Title>
                        <Card.Text>
                            Click button below to track your first skill to learn
                        </Card.Text>
                        <Button>LearnIT</Button>
                    </Card.Body>
                </Card>
            </div>
        )
    }
    else {
        body = (
            <>
                <Row className="row-cols-1 row-cols-md-3 g-4 mx-auto mt-3">
                    {posts.map(post => (
                        <Col key={post._id} className="my-2">
                            <SinglePost post={post} />
                        </Col>
                    ))}
                </Row>

            </>
        )
    }

    return (
        <>
            <NavBar />
            {body}
            {post!= null && <UpdatePostModal/>}
            <AddPostModal />
            {/* Open AddPostModal */}
            <OverlayTrigger placement="left" overlay={<Tooltip>Add a new thing to learn</Tooltip>}>
                <Button className="btn-floating" onClick={() => setShowModal(!showModal)}>
                    <img src={addIcon} width="40" height="40" alt="addPost" />
                </Button>
            </OverlayTrigger>
            {/* after post is added, show toast */}
            <Toast show={show}
                style={{ position: 'fixed', top: '20%', right: "10px" }}
                className={`bg-${type} text-white`}
                onClick={setShowToast.bind(this, {
                    show: false,
                    message: '',
                    type: null
                })}
                delay={3000}
                autohide
                animation
            >
                <Toast.Body>
                    <strong>{message}</strong>
                </Toast.Body>
            </Toast>
        </>
    );
}
export default DashBoard;