import './Details.css'
import image from './Laptop.jpeg'
import Item from '../item/Item'
import { ChevronRight,ChevronLeft } from 'lucide-react'
import { SearchContext } from '../../Reducers/search/SearchContext'
import { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
//import data from '../../pseudoData/data'
import { cartContext } from '../../Reducers/cart/cartContext'
import { products, categories } from '../../test_API/test'
const Details = () => {
    const { searchResult, searchDispatch } = useContext(SearchContext)
    const { name } = useParams();
    const { dispatch } = useContext(cartContext);
    const item = products.find((item)=>item.name == name)
    useEffect(()=>{

        searchDispatch({
            type: "search/global",
            payload: {
                target: name,
                data: products
            }
        })
    },[])

    const handleAddCart = () =>{
        dispatch({
            type:"product/add",
            payload: {
                id: item.id,
                cartItem: {
                    name: item.name,
                    price: item.current_price
                },
                count: 1,
                preprice: item.current_price
            }
        })
    }
    return(
        <div className='flex flex-col gap-10 w-full xl:w-2/3 bg-amber-100 rounded-2xl p-10'>
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
                <h1 className='font-bold text-center border-b border-gray-200'>Description</h1>
                <p className='text-justify'>
                    {item.description}
                </p>
            </div>
            <div className='space-y-5 overflow-hidden '>
                <h1 className='font-bold text-center border-b border-gray-200 '>Produits similaire</h1>
                <div className='flex overflow-x-scroll gap-5 w-300 p-5 '>
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