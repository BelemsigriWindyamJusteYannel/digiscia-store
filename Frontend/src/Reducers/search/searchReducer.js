import { categories } from "../../test_API/test";
export const searchReducer = (state,action) =>{
    switch(action.type){
        case 'search/global':
            const matchedValues = action.payload.data.filter((item)=>{
                const target = categories.find(element=>element.name = action.payload.target )
                return item.category == target.id
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