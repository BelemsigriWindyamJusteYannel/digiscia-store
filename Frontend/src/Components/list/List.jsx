import './List.css'
import Item from '../item/Item';
import { SearchContext } from '../../Reducers/search/SearchContext';
import { useContext, useEffect } from 'react';
//import { products } from '../../test_API/test';
//import data from '../../pseudoData/data'
import { getCategories } from '../../api/category';
import Pagination from './Pagination';
import { useState } from 'react';
import PageSlider from './PageSlider';

const List = ({ categoryName }) => {
    const { searchResult, searchDispatch } = useContext(SearchContext);
    const [ currentPage, setCurrentPage ] = useState(1)
    const [ postPerPage, setPostPerPage ] = useState(10)
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
    const lastPostIndex = currentPage * postPerPage;
    const firstPostIndex = lastPostIndex - postPerPage;
    const currentPageContent = searchResult.slice(firstPostIndex, lastPostIndex)

    return(
        <div className='w-full p-10 my-10 space-y-5 bg-gray-200 rounded-sm'>
            <div className='flex w-full justify-between sm:pl-5 sm:pr-5'>
                <h2>{categoryName}</h2>
                <h2>Total result {searchResult.length}</h2>
            </div>
            <div className='flex-col w-full space-y-10'>
                <div className='w-full h-10 bg-orange-400 rounded-sm'>

                </div>
                <Pagination pageContent={currentPageContent}/>
            </div>
            <div className='flex flex-col space-y-1 items-end sm:flex-row sm:justify-between'>
                <p>Affichage de i à {searchResult.length}</p>
                <div className='flex gap-3 justify-center items-center'>
                    <PageSlider totalPost={searchResult.length} postPerPage={postPerPage} setCurrentPage={setCurrentPage}/>
                </div>
            </div>
        </div>
    )
}

export default List;