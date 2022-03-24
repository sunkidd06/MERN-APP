import React, { useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { PostContext } from "../../contexts/postContext";
import { useState } from 'react';
function UpdatePostModal(props) {

    const { 
        postState: {post},
        showUpdatePostModal,
        setShowUpdatePostModal,
        updatePost,
        setShowToast } = useContext(PostContext);
    const [updatedPost, setUpdatedPost] = useState(post);
    const { title, description, url, status } = updatedPost;
    // const closeDialog = () => {
    //     setNewPost({
    //         title: "",
    //         description: "",
    //         url: "",
    //         status: "TO LEARN"
    //     });
    //     setShowModal(false);
    // }
    console.log("update post");
    console.log(post);
        console.log("title, description, url, status");
        console.log(title, description, url, status);
    const handleChange = (e) => {
        setUpdatedPost({
            ...updatedPost,
            [e.target.name]: e.target.value
        })
    }
    const onSubmit = async (e) => {
        e.preventDefault();
        const {success, message} = await updatePost(updatedPost);
        setShowUpdatePostModal(false);
        // setShowToast({
        //     show: true,
        //     message,
        //     type: success ? 'success' : 'error'
        // });
        // resetData();
    }
    // const resetData = () => {
    //     setNewPost({ title: "", description: "", url: "", status: "TO LEARN" });
    //     setShowModal(false);
    // }
    const closeDialog = () => {
        setShowUpdatePostModal(false);
    }
    return (
        <Modal show={showUpdatePostModal} onHide={closeDialog}>
            <Modal.Header closeButton>
                <Modal.Title>Making Progress</Modal.Title>
            </Modal.Header>
            <Form onSubmit={onSubmit}>
                <Modal.Body>
                    <Form.Group>
                        <Form.Control type="text" placeholder="Title" name="title" required value={title || ""} onChange={handleChange} />
                        <Form.Text id="title-help" muted>Required</Form.Text>
                    </Form.Group>
                    <Form.Group>
                        <Form.Control as="textarea" rows={3} placeholder="description" name="description" value={description || ""} onChange={handleChange} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Control type="text" placeholder="Youtube TuTorial URL " name="url" value={url || ""} onChange={handleChange} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Control as="select" value={status || ""} name='status' onChange={handleChange} >
                        <option value="TO LEARN"> TO LEARN</option>
                        <option value="LEARNING"> LEARNING</option>
                        <option value="LEARNED"> LEARNED</option>
                        </Form.Control>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" >Cancel</Button>
                    <Button variant="primary" type="Submit">Learn IT</Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
}

export default UpdatePostModal;