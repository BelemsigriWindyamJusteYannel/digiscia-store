import Categories from "../Components/sideBars/Categories/Categories";
import Item from "../Components/item/Item";
import { ChevronRight,ChevronLeft } from 'lucide-react'
import image from "./Laptop.jpeg"
import { useState } from "react";
import Signin from "../Components/subscription/Signin";

const Home = () => {
    return(
        <div>
            <div className="flex p-10 space-x-15 bg-gray-100">
                <Categories/>
                <div className="w-150 h-100 ml-40 flex justify-center items-end gap-1 bg-[url(./Laptop.jpeg)] bg-cover rounded-3xl">
                    <div className="bg-black w-3 h-3 rounded-full"></div>
                    <div className="bg-black w-3 h-3 rounded-full"></div>
                    <div className="bg-black w-3 h-3 rounded-full"></div>
                </div>
            </div>
            <div className="p-10 space-y-5 overflow-hidden bg-gray-200 ">
                <div className="flex justify-center">
                    <p className="border-b border-gray-400 font-bold">Promotion</p>
                </div>
                <div className="flex w-1500 overflow-scroll gap-5 p-5 ">
                    <Item/>
                    <Item/>
                    <Item/>
                    <Item/>
                    <Item/>
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
            <div className="h-screen py-15">
                <div className="flex justify-center">
                    <p className="border-b border-gray-400 font-bold">Publicité</p>
                </div>
                <div className="flex justify-around py-10">
                    <div className="w-1/2 ml-20 p-15 flex-col space-y-15 bg-[#bbb2b249] rounded-3xl">
                        <p className="text-justify">
                            Lorem ipsum dolor sit amet consectetur, adipisicing elit. 
                            Non cupiditate omnis perspiciatis hic, incidunt velit quis assumenda?
                            Possimus, dignissimos, ipsum enim, sint pariatur magnam 
                            voluptatem nemo recusandae amet minima quisquam.
                        </p>
                        <button className="py-3 px-15 bg-blue-600 rounded-2xl">
                            Ajouter au panier
                        </button>
                    </div>
                    <div className="flex justify-center p-5 w-1/2">
                        <img className="w-2/3 rounded-3xl" src={image} alt="Laptop-Promotion" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;