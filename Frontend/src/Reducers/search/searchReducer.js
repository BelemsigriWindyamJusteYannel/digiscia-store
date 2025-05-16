
export const searchReducer = (state,action) =>{
    switch(action.type){
        case 'search/global':
            const matchedValues = action.payload.data.filter((item)=>{
                return item.name.includes(action.payload.target)
            })
            return matchedValues;
        case 'search/filter':
            const filteredValues = action.payload.data.filter((item)=>{
                return item.price == action.payload.target
            })
            return filteredValues;
        default :
            return state;
    }
}