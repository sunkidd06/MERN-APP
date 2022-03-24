import React, { createContext, useReducer } from 'react';
import postReducer from "../reducers/postReducer";
import { apiUrl } from './constant';
import axios from 'axios';
import { useState } from 'react';

export const PostContext = createContext();
const PostContextProvider = ({ children }) => {
    // State
    const [postState, dispatch] = useReducer(postReducer, {
        post: null,
        posts: [],
        postLoading: true
    });
    const [showModal, setShowModal] = useState(false);
    const [showUpdatePostModal, setShowUpdatePostModal] = useState(false);
    const [showToast, setShowToast] = useState({
        show: false,
        message: '',
        type: null
    });


    // GET ALL POST
    const getAllPost = async () => {
        try {
            const response = await axios.get(`${apiUrl}/post`);
            console.log("Da get all post thanh cong", response.data);
            if (response.data.success) {
                dispatch({ type: 'POST_LOADED_SUCCESS', payload: response.data.posts });
            }
            else {
                response.json({ message: "Looi cmnr" });
            }
        } catch (error) {
            dispatch({ type: "POST_LOADED_FAIL" });
        }
    }
    const addPost = async (newPost) => {
        try {
            const response = await axios.post(`${apiUrl}/post`, newPost);
            if (response.data.success) {
                dispatch({ type: "ADD_POST", payload: response.data.post })
                return response.data;
            }
        } catch (error) {
            //    return error.response.data ? error.message.data : {success: false, message:"SERVER ERORR"}
        }
    }
    const deletePost = async (id) => {
        try {
            const response = await axios.delete(`${apiUrl}/post/${id}`);
            if (response.data.success) {
                // lay id de dua ra khoi danh sach
                dispatch({ type: "DELETE_POST", payload: id })
            }
        } catch (error) {
            return error.message;
        }
    }
    // find post when user update post
    const findPost = (postId) => {
        const post = postState.posts.find(post => post._id === postId);
        console.log("Post find", post);
        dispatch({type:"FIND_POST", payload:post})
    }
    // update post
    const updatePost = async (updatedPost) => {
        try {
            // khi updatePost ta can phai truyen id can update va body cua phan update
            const response = axios.put(`${apiUrl}/post/${updatedPost._id}`, updatedPost)
            if (response.data.success) {
                dispatch({ type: "UPDATE_POST", payload: response.data.post });
                return response.data;       
            }
        } catch (error) {
                return error
        }
    }
    const postContextData = { getAllPost, postState, showModal, setShowModal, addPost, deletePost, showToast, setShowToast, updatePost, findPost, showUpdatePostModal, setShowUpdatePostModal}
    return (
        <PostContext.Provider value={postContextData}>
            {children}
        </PostContext.Provider>
    )
}

export default PostContextProvider;