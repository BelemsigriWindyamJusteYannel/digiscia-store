import Categories from "../Components/sideBars/Categories/Categories";
import Item from "../Components/item/Item";
import { ChevronRight,ChevronLeft } from 'lucide-react'
import image from "./Laptop.jpeg"
import { useState } from "react";
import products from '../pseudoData/data'

const Home = () => {
    return(
        <div>
            <div className="flex flex-col gap-5 items-center p-10  bg-amber-300 sm:flex-row sm:justify-between shadow-2xl">
                <Categories/>
                <div className="w-70 h-70 flex justify-center items-end gap-1 pb-2 bg-[#ffffff] bg-cover rounded-3xl">
                    <div className="bg-black w-3 h-3 rounded-full"></div>
                    <div className="bg-black w-3 h-3 rounded-full"></div>
                    <div className="bg-black w-3 h-3 rounded-full"></div>
                </div>
            </div>
            <div className="p-10 space-y-5 overflow-hidden bg-amber-600">
                <div className="flex justify-center">
                    <p className="border-b border-gray-400 font-bold">Promotion</p>
                </div>
                <div className="flex overflow-x-scroll gap-5 w-300 p-5">
                    {
                        products.map((product,index)=>(
                            <Item key={index}
                                id={product.id}
                                name={product.name}
                                description={product.description}
                                price= {product.price}
                                available= {product.available}
                                stock= {product.stock}
                                category= {product.category}
                            />
                        ))
                    }
                </div>
                <div className='flex justify-center gap-5'>
                    <button className='w-15 bg-blue-50 rounded-3xl flex justify-center text-gray-500'><ChevronLeft /></button>
                    <button className='w-15 bg-blue-50 rounded-3xl flex justify-center text-gray-500'><ChevronRight /></button>
                </div>
            </div>
            <div className="p-10 space-y-5 overflow-hidden bg-amber-600">
                <div className="flex justify-center">
                    <p className="border-b border-gray-400 font-bold">Promotion</p>
                </div>
                <div className="flex overflow-x-scroll gap-5 w-300 p-5">
                    {
                        products.map((product,index)=>(
                            <Item key={index}
                                id={product.id}
                                name={product.name}
                                description={product.description}
                                price= {product.price}
                                available= {product.available}
                                stock= {product.stock}
                                category= {product.category}
                            />
                        ))
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

export default Home;