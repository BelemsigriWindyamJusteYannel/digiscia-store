import './Item.css';
//import image from './laptop-pencils-arrangement.jpg'
import image from './Laptop.jpeg'
import { Plus } from 'lucide-react';

const Item = () => {
    return(
        <>
            <article className='border border-gray-100 rounded-2xl w-45 flex-col p-2 space-y-2'>
                <h3>HP Laptop 15 yy</h3>
                <div className='border border-green-200 w-15 rounded-2xl flex justify-center bg-green-200'>
                    <p>-80%</p>
                </div>
                <img className='w-full h-25 rounded-2xl' src={image} alt="Laptop-pencil" />
                <div className='flex justify-between'>
                    <p>5000 DHS</p>
                    <button className='w-10 bg-gray-200 flex justify-center rounded-2xl hover:bg-gray-500 text-gray-500'>
                        <Plus />
                    </button>
                </div>
            </article>
        </>
    )
}

export default Item;