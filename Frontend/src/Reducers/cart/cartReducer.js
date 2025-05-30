
export const cartReducer = (state,action) => {
    switch ( action.type ){
        case 'product/add' :
            const inserTry = state.find((item)=>item.id === action.payload.id);
            if(!inserTry){
                console.log("cartReducer side =>",action.payload.product)
                alert("Produit ajouté au panier");
                return [...state,action.payload];
            }
        case 'product/remove' :
            console.log(state)
            return state.filter(item => item.id !== action.payload)
        case 'product/updateCount' :
            //console.log(state)
            const newState = state.map((item)=>
                item.id == action.payload.id
                ?{
                    ...item,
                    count: action.payload.count,
                    preprice : action.payload.preprice,
                }: item
            );
            //console.log("newState",newState)
            return newState
        case 'product/clear' :
            return [];
        default:
            return state;
    }
} 
