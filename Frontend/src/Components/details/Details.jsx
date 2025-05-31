import './Details.css'
import image from './Laptop.jpeg'
import Item from '../item/Item'
import { ChevronRight,ChevronLeft } from 'lucide-react'
import { SearchContext } from '../../Reducers/search/SearchContext'
import { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
//import data from '../../pseudoData/data'
import { cartContext } from '../../Reducers/cart/cartContext'
//import { products, categories } from '../../test_API/test'
import { getProducts } from '../../api/product'
const Details = () => {
    const [ clicked, setClicked ] = useState(false);
    const { searchResult, searchDispatch } = useContext(SearchContext)
    const { name } = useParams();
    console.log(name)
    const { dispatch } = useContext(cartContext);
    const item = getProducts.data.find((item)=>item.name == name)
    console.log(item)
    useEffect(()=>{

        searchDispatch({
            type: "search/global",
            payload: {
                target: name,
                data: getProducts.data
            }
        })
    },[])

    const handleAddCart = () =>{
        dispatch({
            type:"product/add",
            payload: {
                id: item.id,
                product: item,
                count: 1,
                preprice: item.current_price
            }
        })
    }
    return(
        <div className='flex flex-col gap-10 w-full xl:w-2/3 shadow-xl rounded-2xl p-10'>
            <div className='flex flex-col gap-5 w-full justify-around sm:flex-row'>
                <img className='w-60 h-50 rounded-sm' src={item.image} alt={item.name} />
                <div className='space-y-5' >
                    <h1 className='font-bold text-2xl'>{item.name}</h1>
                    <div className='border-b border-gray-300 font-bold flex gap-2'>
                        <p>Availability :</p>
                        {item.stock > 0 ? (<p className='text-green-600'>Available</p>):(<p className='text-red-500'>Unavailable</p>)}
                    </div>
                    <p>{item.current_price} DHS</p>
                    {
                        item.stock > 0 ? (
                            <button 
                                onClick={handleAddCart}
                                className='bg-amber-500 hover:bg-amber-600 p-2 pl-10 pr-10 rounded-3xl'
                            >
                                Ajouter au panier
                            </button>
                        ) : (
                            <div className='bg-red-200 text-center text-red-400 p-2 pl-10 pr-10 rounded-smp'>
                                <p>Rupture de stok</p>
                            </div>
                        )
                    }
                </div>
            </div>
            <div className='space-y-5'>
                <div className='flex justify-around'>
                    <div>
                        <h1 
                            className='font-semibold text-xl text-center border-b border-gray-200 cursor-pointer'
                            onClick={()=>setClicked(prev=>!prev)}>Description</h1>
                    </div>
                    <div>
                        <h1 
                            className='font-semibold text-xl text-center border-b border-gray-200 cursor-pointer'
                            onClick={()=>setClicked(prev=>!prev)}>Comments</h1>
                    </div>
                </div>
                {
                    !clicked ? (
                        <div>
                            <p className='text-justify '>
                                {item.description}
                            </p>
                        </div>
                    ) : (
                        <div>
                            <p className='text-justify'>
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente, 
                                    repudiandae? Ullam, asperiores non iure minus, 
                                    quasi ipsa ipsam vero adipisci iusto
                                    consectetur doloremque minima nobis ex dolore harum porro magni.
                            </p>
                        </div>
                    )
                }
            </div>
            <div className='space-y-5 overflow-hidden '>
                <h1 className='font-semibold text-xl text-center border-b border-gray-200 '>Produits similaire</h1>
                <div className="flex overflow-x-auto gap-5 w-full p-5 scroll-smooth no-scrollbar">
                    {
                        searchResult.map((item,index)=>
                            <Item 
                                key={index}  
                                id={item.id} 
                                name={item.name} 
                                description={item.description} 
                                price={item.current_price} 
                                available={item.stock > 0}
                                stock={item.stock} 
                                category={item.category}
                                image={item.image}  
                            />
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default Details;