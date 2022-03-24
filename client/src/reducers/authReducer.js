export const authReducer = (state, action) => {
    const {type, payload} = action;
    console.log("payload of auth Reducer", payload);
    switch(type) {
        case 'SET_AUTH':
            return {
                ...state,
                authLoading:false,
                isAuthenticated : payload.isAuthenticated,
                user: payload.user, 
            }
        default:
            return state;
    }
}