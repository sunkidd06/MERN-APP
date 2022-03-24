import React from 'react';
import Button from 'react-bootstrap/Button'
import playIcon from '../../assets/play.svg'
import editIcon from '../../assets/edit.svg'
import deleteIcon from '../../assets/delete.svg'
import { PostContext } from '../../contexts/postContext';
import {useContext} from 'react';
function ActionButton(props) {
    const { _id, url} = props; 
    const {deletePost, findPost, setShowUpdatePostModal} = useContext(PostContext);
    
    const choosePost = (postId) => {
        findPost(postId);
        setShowUpdatePostModal(true);
    }
    return (
        <>
            <Button className="post-button" href={url} target="_blank" >
                <img src={playIcon} width="32" height="32" alt="play" />
            </Button>
            <Button className="post-button"  onClick={choosePost.bind(this, _id)}>
                <img src={editIcon} width="32" height="32" alt="edit" />
            </Button>
            <Button className="post-button" onClick ={deletePost.bind(this, _id)}>
                <img src={deleteIcon} width="32" height="32" alt="delete" />
            </Button>
            
        </>
    );
}

export default ActionButton;