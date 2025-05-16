

export const commandeReducer = (state, action) => {
    switch(action.type){
        case 'commandes/add':
            return 1;
        default:
            return state;
    }
}