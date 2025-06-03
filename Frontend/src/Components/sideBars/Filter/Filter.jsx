import Categories from '../Categories/Categories';
import './Filter.css';
import { useContext, useEffect, useState } from 'react';

import PriceSlider from '../../PriceSlider';
//import data from '../../../pseudoData/data';
const Filter = ({categoryName}) => {

    return(
        <>
            <div className='w-60 rounded-sm p-5 space-y-5  bg-orange-200'>
                <div className='rounded-xl py-2 flex justify-center bg-orange-500 text-[#fffffff1]'>
                    <h2 className='font-bold'>Filter</h2>
                </div>
                    <PriceSlider categoryName={ categoryName }/>
            </div>
        </>
        
    )
}

export default Filter;


