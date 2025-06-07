
export const userReducer = (state,action) => {
    switch ( action.type ){
        case 'user/add' :
            console.log("reducer =>",action.payload.user)
            return action.payload.user;
        case 'user/clear' :
            return {};
        default:
            return state;
    }
} 
