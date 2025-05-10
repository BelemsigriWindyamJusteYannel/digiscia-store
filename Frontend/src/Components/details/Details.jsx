import './Details.css'
import image from './Laptop.jpeg'
import Item from '../item/Item'
import { ChevronRight,ChevronLeft } from 'lucide-react'
const Details = () => {
    return(
        <div className='w-200 bg-[#ffffff] rounded-2xl p-10 space-y-10 ml-30 '>
            <div className='flex w-full justify-around'>
                <img className='w-60 h-50 rounded-sm' src={image} alt="Laptop" />
                <div className='space-y-5' >
                    <h1 className='font-bold text-2xl'>HP Laptop 15...</h1>
                    <div className='border-b border-gray-300 font-bold'>
                        <p>Availability : Available</p>
                    </div>
                    <p>10000 DHS</p>
                    <button className='bg-blue-500 p-2 pl-10 pr-10 rounded-3xl'>Ajouter au panier</button>
                </div>
            </div>
            <div className='space-y-5'>
                <h1 className='font-bold text-center border-b border-gray-200'>Description</h1>
                <p className='text-justify'>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Esse, alias! Distinctio dolorum cumque quasi
                    suscipit aut fuga sequi porro recusandae eum impedit atque magnam, illo omnis ea, fugiat maxime. Fuga!
                </p>
            </div>
            <div className='space-y-5 overflow-hidden '>
                <h1 className='font-bold text-center border-b border-gray-200 '>Produits similaire</h1>
                <div className='flex overflow-x-scroll translate-1 gap-5 w-400 p-5 '>
                    <Item/>
                    <Item/>
                    <Item/>
                    <Item/>
                    <Item/>
                    <Item/>
                    <Item/>
                    <Item/>
                    <Item/>
                </div>
                <div className='flex justify-center gap-5'>
                    <button className='w-15 bg-blue-50 rounded-3xl flex justify-center text-gray-500'><ChevronLeft /></button>
                    <button className='w-15 bg-blue-50 rounded-3xl flex justify-center text-gray-500'><ChevronRight /></button>
                </div>
            </div>
        </div>
    )
}

export default Details;