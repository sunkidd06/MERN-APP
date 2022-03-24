import axios from 'axios';
import { useEffect } from 'react';
import { createContext, useReducer } from 'react';
import { authReducer } from '../reducers/authReducer';
import setAuthToken from '../utils/setAuthToken';
import { apiUrl, LOCAL_STORAGE_TOKEN_NAME } from './constant';
export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
    const [authState, dispatch] = useReducer(authReducer, {
        authLoading: true,
        isAuthenticated: false,
        user: null
    });
    // 
    const loadUser = async () => {
        console.log("da laod boi useEffec");
        if (localStorage[LOCAL_STORAGE_TOKEN_NAME]) {
            console.log("Da kiem tra trong local storage co token chua");
            setAuthToken(localStorage[LOCAL_STORAGE_TOKEN_NAME]);
        }
        try {
            console.log("goi API toi api/auth");
            const response = await axios.get(`${apiUrl}/auth`);
            console.log("Respone tra ve tu api api/auth " , response);
            if (response.data.success) {
                dispatch({ type: 'SET_AUTH', payload: { isAuthenticated: true, user: response.data.user } });
            }
        } catch (error) {
            localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME);
            setAuthToken(null);
            dispatch({ type: 'SET_AUTH', payload: { isAuthenticated: false, user: null } })
        }
    }
    // login
    const loginUser = async (userForm) => {
        try {
            const response = await axios.post(`${apiUrl}/auth/login`, userForm)
            // kiem tra data tra ve va gan token vao localstored   
            if (response.data.success) {
                localStorage.setItem(LOCAL_STORAGE_TOKEN_NAME, response.data.accessToken);
                return response.data;
            }
            console.log("authState", authState);
            await loadUser();
        } catch (error) {
            if (error.response.data) {
                return error.response.data;
            }
            else {
                return { success: false, message: error.message }
            }
        }
    }
    useEffect(() => loadUser(), []);
    const registerUser = async (registerForm) => {
        try {
            const response = await axios.post(`${apiUrl}/auth/register`, registerForm);
            // kiem tra data tra ve va gan token vao localstored   
            if (response.data.success) {
                localStorage.setItem(LOCAL_STORAGE_TOKEN_NAME, response.data.accessToken);
                return response.data;
            }
            await loadUser();
        } catch (error) {
            if (error.response.data) {
                return error.response.data;
            }
            else {
                return { success: false, message: error.message }
            }
        }
    }
    const logoutUser = () => {
        localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME);
        dispatch({
            type: 'SET_AUTH',
            payload: { isAuthenticated: false, user: null }
        });
        
    }
    // Context dâta
    const authContextData = { loginUser, authState, registerUser, logoutUser };
    // return Provider
    return (
        <AuthContext.Provider value={authContextData}>
            {children}
        </AuthContext.Provider>
    )
}
export default AuthContextProvider;