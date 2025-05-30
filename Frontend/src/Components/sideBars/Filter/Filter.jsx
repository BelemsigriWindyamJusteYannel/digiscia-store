import Categories from '../Categories/Categories';
import './Filter.css';
import { useContext, useEffect, useState } from 'react';
import { SearchContext } from '../../../Reducers/search/SearchContext';
//import data from '../../../pseudoData/data';
const Filter = ({categoryName}) => {
    const [ filterMinPrice, setFilterMinPrice ] = useState(0);
    const [ filterMaxPrice, setFilterMaxPrice ] = useState(10000);
    const { searchDispatch } = useContext(SearchContext);


    const handleFilter = (e) => {
        
        searchDispatch({
            type: 'search/filter',
            payload: {
                target : categoryName,
                filterMinPrice,
                filterMaxPrice
            }
        })
    }


    return(
        <>
            <div className='w-60 rounded-sm p-5 space-y-5  bg-orange-200'>
                <div className='rounded-xl py-2 flex justify-center bg-orange-500 text-[#fffffff1]'>
                    <h2 className='font-bold'>Filter</h2>
                </div>
                <form className='flex flex-col items-start gap-10'>
                    <div className="relative w-full">
                        <label htmlFor="price-range-input" className="sr-only">Default range</label>
                        <input 
                            onChange={(e)=>setFilterMinPrice((prev)=>{
                                return e.target.value;
                            })} 
                            id="price-range-input" 
                            type="range" 
                            min="100" 
                            max="10000" 
                            className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-gray-700 mb-5" 
                            value={filterMinPrice}
                        />
                        <div className='flex justify-between'>
                            <div>
                                <input 
                                    onChange={(e)=>setFilterMinPrice((prev)=>{
                                        return e.target.value;
                                    })} 
                                    type="number" 
                                    value={filterMinPrice} 
                                    className='w-20 bg-[#ffffff] rounded-3xl border border-gray-300 py-1 px-3 text-start text-gray-400'
                                />
                            </div>
                            <div>
                                <input 
                                    onChange={(e)=>setFilterMaxPrice((prev)=>{
                                        return e.target.value;
                                    })} 
                                    type="number" 
                                    value={filterMaxPrice} 
                                    className='w-20 bg-[#ffffff] rounded-3xl border border-gray-300 py-1 px-2 text-start text-gray-400'
                                />
                            </div>
                        </div>
                        <div>
                            <span className="text-[15px] text-gray-500 absolute start-0 -bottom-6">Min (100)</span>
                            <span className="text-[15px] text-gray-500 absolute end-0 -bottom-6">Max (10000)</span>
                        </div>
                    </div>
                    <button 
                        onClick={handleFilter}
                        type="button" 
                        className="text-gray-900 bg-gray-400 hover:bg-gray-500 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2"
                    >
                        Filtrer
                    </button>
                </form>
            </div>
        </>
        
    )
}

export default Filter;


