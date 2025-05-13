import './Details.css'
import image from './Laptop.jpeg'
import Item from '../item/Item'
import { ChevronRight,ChevronLeft } from 'lucide-react'
import { SearchContext } from '../../Reducer/SearchContext'
import { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import data from '../../pseudoData/data'
const Details = () => {
    const { searchResult, searchDispatch } = useContext(SearchContext)
    const { name } = useParams();

    useEffect(()=>{

        searchDispatch({
            type: "search/global",
            payload: {
                target: name,
                data: data
            }
        })
    },[])

    return(
        <div className='flex flex-col gap-10 w-full xl:w-2/3 bg-amber-100 rounded-2xl p-10'>
            <div className='flex flex-col gap-5 w-full justify-around sm:flex-row'>
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
                <div className='flex overflow-x-scroll gap-5 w-300 p-5 '>
                    {
                        searchResult.map((item,index)=>
                            <Item key={index}  id={item.id} name={item.name} description={item.description} price={item.price} available={item.available} stock={item.stock} category={item.category}/>
                        )
                    }
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