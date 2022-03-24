import React, { useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { PostContext } from "../../contexts/postContext";
import { useState } from 'react';
function AddPostModal(props) {
    const { showModal, setShowModal, addPost, showToast: { show, message, type }, setShowToast } = useContext(PostContext);
    const closeDialog = () => {
        setNewPost({
            title: "",
            description: "",
            url: "",
            status: "TO LEARN"
        });
        setShowModal(false);
    }
    const [newPost, setNewPost] = useState({
        title: "",
        description: "",
        url: "",
        status: "TO LEARN"
    })
    const handleChange = (e) => {
        setNewPost({
            ...newPost,
            [e.target.name]: e.target.value
        })
    }
    const onSubmit = async (e) => {
        e.preventDefault();
        const {success, message}= await addPost(newPost);
        setShowToast({
            show: true,
            message,
            type: success ? 'success' : 'error'
        });
        resetData();
    }
    const resetData = () => {
        setNewPost({ title: "", description: "", url: "", status: "TO LEARN" });
        setShowModal(false);
    }
    const { title, description, url } = newPost;
    return (
        <Modal show={showModal} onHide={closeDialog}>
            <Modal.Header closeButton>
                <Modal.Title>What do to want to learn?</Modal.Title>
            </Modal.Header>
            <Form onSubmit={onSubmit}>
                <Modal.Body>
                    <Form.Group>
                        <Form.Control type="text" placeholder="Title" name="title" required value={title} onChange={handleChange} />
                        <Form.Text id="title-help" muted>Required</Form.Text>
                    </Form.Group>
                    <Form.Group>
                        <Form.Control as="textarea" rows={3} placeholder="description" name="description" value={description} onChange={handleChange} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Control type="text" placeholder="Youtube TuTorial URL " name="url" title={url} onChange={handleChange} />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeDialog}>Cancel</Button>
                    <Button variant="primary" type="Submit">Learn IT</Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
}

export default AddPostModal;