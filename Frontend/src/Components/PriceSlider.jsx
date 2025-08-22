import { useState } from "react"

import { Label } from "@/Components/ui/label"
import { Slider } from "@/Components/ui/slider"
import { SearchContext } from "../Reducers/search/SearchContext"
import { useContext } from "react"
import { Button } from "./ui/button"
import { getProducts } from "../api/product"
import { useEffect } from "react"
export default function PriceSlider({ categoryName }) {
  const [value, setValue] = useState([100, 10000])
  const { searchDispatch } = useContext(SearchContext);
  
  useEffect(()=>{
    const prices = getProducts.data.map(p => p.current_price);
    const max = Math.max(...prices);
    const min = Math.min(...prices);

    setValue([min, max]);
  },[])

  const handleFilter = (e) => {
      
      searchDispatch({
          type: 'search/filter',
          payload: {
              target : categoryName,
              filterMinPrice : value[0],
              filterMaxPrice : value[1]
          }
      })
  }
  return (
    <div className="w-full">
      <div className="py-5">
        <Slider 
          value={value}
          onValueChange={setValue}
          aria-label="Dual range slider with output" />
      </div>
      <div className="relative w-full mb-10"> 
          <div className='flex justify-between'>
              <div>
                  <input 
                      onChange={(e)=>{
                        const newMin = parseInt(e.target.value);
                        setValue([newMin, value[1]]);
                      }} 
                      type="number" 
                      value={value[0]} 
                      className='w-20 bg-[#ffffff] rounded-3xl border border-gray-300 py-1 px-3 text-start text-gray-400'
                  />
              </div>
              <div>
                  <input 
                      onChange={(e)=>{
                        const newMax = parseInt(e.target.value);
                        setValue([value[0], newMax]);
                      }} 
                      type="number" 
                      value={value[1]} 
                      className='w-20 bg-[#ffffff] rounded-3xl border border-gray-300 py-1 px-2 text-start text-gray-400'
                  />
              </div>
          </div>
          <div>
              <span className="text-[15px] text-gray-500 absolute start-0 -bottom-6">Min (100)</span>
              <span className="text-[15px] text-gray-500 absolute end-0 -bottom-6">Max (10000)</span>
          </div>
      </div>
      <Button 
        onClick={handleFilter}
        type="button" 
        className="text-gray-900 bg-gray-400 hover:bg-gray-500 font-medium rounded-xl text-sm px-5 py-2.5 me-2 mb-2 active:scale-110 transition-transform duration-100"
      >
        Filtrer
      </Button>
    </div>
  );
}
