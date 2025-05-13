
export const cartReducer = (state,action) => {
    switch ( action.type ){
        case 'product/add' :
            console.log(action.payload)
            return [...state,action.payload];
        case 'product/remove' :
            return state.filter(item => item.id !== action.payload)
        case 'product/updateCount' :
            const newState = state.map((item)=>
                item.id == action.payload.id
                ?{
                    ...item,
                    count: action.payload.count,
                }: item
            );
            return newState.map((item)=>
                item.id == action.payload.id
                ?{
                    ...item,
                    count: action.payload.count,
                    preprice: item.cartItem.price * item.count
                }: item
            );
        case 'product/clear' :
            return [];
        default:
            return state;
    }
} 
