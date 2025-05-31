import './Categories.css';
import { Link } from 'react-router-dom';
import { exemples } from './exmples';
import { getCategories } from '../../../api/category';
import { useEffect, useState } from 'react';

const Categories = () =>{
    const [ categories,setCategories ] = useState([])
    useEffect(()=>{
        setCategories(()=>{
            return getCategories.data
        })
    },[])
    return(
        <div className='w-60 rounded-sm p-5 space-y-5 bg-orange-200'>
            <div className='rounded-xl py-2 flex justify-center text-[#fffffff1] bg-orange-500'>
                <h2 className='font-bold'>Categories</h2>
            </div>
            <ul className='flex flex-col space-y-2 sm:space-1'>
                {
                    categories.map((categorie, index)=>(
                        <Link to={`/CategoriesPage/${categorie.name}`} key={index}>
                            <li className='border-b border-gray-500 hover:text-[#837b7bd3] hover:border-[#fff] hover:scale-100'>{categorie.name}</li>
                        </Link>
                    ))
                }
            </ul>
        </div>
    )
}

export default Categories;