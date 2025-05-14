import Categories from '../Categories/Categories';
import './Filter.css';
import { useContext, useEffect, useState } from 'react';
import { SearchContext } from '../../../Reducer/SearchContext';
import data from '../../../pseudoData/data';
const Filter = () => {
    const [ filterPrice, setFilterPrice ] = useState(0);
    const { searchDispatch } = useContext(SearchContext);


    const handleFilter = (e) => {
        
        searchDispatch({
            type: 'search/filter',
            payload: {
                target: e.target.value,
                data: data
            }
        })
    }


    return(
        <>
            <div className='w-60 rounded-sm p-5 space-y-5  bg-amber-100'>
                <div className='rounded-xl py-2 flex justify-center bg-amber-700 text-[#fffffff1]'>
                    <h2 className='font-bold'>Filter</h2>
                </div>
                <form className='flex flex-col items-start gap-10'>
                    <div className="relative w-full">
                        <label htmlFor="price-range-input" className="sr-only">Default range</label>
                        <input 
                            onChange={(e)=>setFilterPrice((prev)=>{
                                return e.target.value;
                            })} 
                            type="number" 
                            value={filterPrice} 
                            className='w-20 bg-[#ffffff] rounded-3xl border border-gray-300 py-1 px-3 text-start text-gray-400'
                        />
                        <input 
                            onChange={(e)=>setFilterPrice((prev)=>{
                                return e.target.value;
                            })} 
                            id="price-range-input" 
                            type="range" 
                            min="100" 
                            max="10000" 
                            className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-gray-700" 
                            value={filterPrice}
                        />
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


