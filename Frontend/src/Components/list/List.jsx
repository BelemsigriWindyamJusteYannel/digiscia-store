import './List.css'
import Item from '../item/Item';
import { SearchContext } from '../../Reducers/search/SearchContext';
import { useContext, useEffect } from 'react';
//import { products } from '../../test_API/test';
//import data from '../../pseudoData/data'
import { getCategories } from '../../api/category';

const List = ({ categoryName }) => {
    const { searchResult, searchDispatch } = useContext(SearchContext);
    useEffect(()=>{
        if(getCategories.data.find(element=>element.name == categoryName)){
            searchDispatch({
            type: "search/global",
            payload: {
                target: categoryName,
            }
        })
        }
    },[categoryName])
    console.log("searchResult =>",searchResult)
    return(
        <div className='w-full p-10 my-10 space-y-5 bg-gray-200 rounded-sm'>
            <div className='flex w-full justify-between sm:pl-5 sm:pr-5'>
                <h2>{categoryName}</h2>
                <h2>Total result {searchResult.length}</h2>
            </div>
            <div className='flex-col w-full space-y-10'>
                <div className='w-full h-10 bg-blue-300 rounded-sm'>

                </div>
                <div className='flex flex-wrap gap-5 justify-center items-center'>
                    {
                        searchResult.map((item,index)=>
                            <Item 
                                key={index}  
                                id={item.id} 
                                name={item.name} 
                                description={item.description} 
                                price={item.current_price} 
                                image={item.image} 
                                stock={item.stock} 
                                category={item.category}
                            />
                        )
                    }
                </div>
            </div>
            <div className='flex flex-col space-y-1 items-end sm:flex-row sm:justify-between'>
                <p>Affichage de i à {searchResult.length}</p>
                <div className='flex gap-3 justify-center items-center'>
                    <div className='w-7 h-7 bg-gray-200 rounded-full text-gray-500 flex justify-center items-center'>
                        <p>1</p>
                    </div>
                    <div className='w-7 h-7 bg-gray-200 rounded-full text-gray-500 flex justify-center items-center'>
                        <p>1</p>
                    </div>
                    <div className='w-7 h-7 bg-gray-200 rounded-full text-gray-500 flex justify-center items-center'>
                        <p>1</p>
                    </div>
                    <p>...</p>
                    <div className='w-7 h-7 bg-gray-200 rounded-full text-gray-500 flex justify-center items-center'>
                        <p>1</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default List;