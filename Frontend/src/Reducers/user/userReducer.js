
export const userReducer = (state,action) => {
    switch ( action.type ){
        case 'user/add' :
            if(action.payload){
               //console.log("user reducer =>",action.payload.user) 
               localStorage.setItem('user',JSON.stringify(action.payload.user));
               return action.payload.user
            }            
            //console.log("reducer user =>",JSON.parse(localStorage.getItem("user")));
            return 0;
        case 'user/clear' :
            localStorage.removeItem('user');
            return {};
        default:
            return state;
    }
} 
