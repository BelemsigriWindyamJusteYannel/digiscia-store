import './Categories.css';
import { Link } from 'react-router-dom';
import { exemples } from './exmples';

const Categories = () =>{
    return(
        <div className='border border-gray-200 w-60 rounded-sm p-5 space-y-5 bg-gray-200'>
            <div className='rounded-xl py-2 flex justify-center bg-blue-400'>
                <h2 className='font-bold'>Categories</h2>
            </div>
            <ul>
                {
                    exemples.map((categorie, index)=>(
                        <Link to="/CategoriesPage" key={index} >
                            <li className='border-b border-gray-500'><a href="#">{categorie}</a></li>
                        </Link>
                    ))
                }
            </ul>
        </div>
    )
}

export default Categories;