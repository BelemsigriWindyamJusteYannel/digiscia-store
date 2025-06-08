//import { categories, products } from "../../test_API/test";
import { getProducts } from "../../api/product";


export const searchReducer = (state,action) =>{
    switch(action.type){
        case 'search/global':
            console.log("Current state =>",state)
            const target = []
            getProducts.data.map(element=>{
                if(element.category.name == action.payload.target){
                    target.push(element);
                }
            } )
            //console.log(target)
            return target
        case 'search/specific':
            console.log("Current state =>",state)
            console.log("action.payload.data =>",action.payload.data)
            return action.payload.data
        case 'search/filter':
            const filteredValues = []
            state.length > 0 ?
            state.map(element=>{
                if( element.current_price > action.payload.filterMinPrice & element.current_price < action.payload.filterMaxPrice ){
                    filteredValues.push(element);
                }
            }) : getProducts.data.map(element=>{
                if( element.current_price > action.payload.filterMinPrice 
                    & element.current_price < action.payload.filterMaxPrice 
                    & element.category.name == action.payload.target )
                {
                    filteredValues.push(element);
                }
            })
            console.log(filteredValues)
            return filteredValues;
        default :
            return state;
    }
}