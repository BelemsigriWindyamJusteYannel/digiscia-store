import Header from "../Components/header/Header";
import Path from "../Components/path/Path";
import BackBlur from "../Components/background/BackBlur";
import Categories from "../Components/sideBars/Categories/Categories";
import Footer from "../Components/footer/Footer";
import Item from "../Components/item/Item";
import { ChevronRight,ChevronLeft } from 'lucide-react'
import image from "./Laptop.jpeg"

const Home = () => {
    return(
        <div>
            <BackBlur/>
            <Header/>
            <Path/>
            <div className="flex p-10 space-x-15">
                <Categories/>
                <div className="w-150 h-100 ml-40 flex justify-center items-end gap-1 bg-[url(./Laptop.jpeg)] bg-cover rounded-3xl">
                    <div className="bg-black w-3 h-3 rounded-full"></div>
                    <div className="bg-black w-3 h-3 rounded-full"></div>
                    <div className="bg-black w-3 h-3 rounded-full"></div>
                </div>
            </div>
            <div className="p-10 space-y-5 overflow-hidden">
                <div className="flex justify-center">
                    <p className="border-b border-gray-400 font-bold">Promotion</p>
                </div>
                <div className="flex w-1500 overflow-scroll gap-5 p-5">
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
            <div>
                <div className="flex justify-center">
                    <p className="border-b border-gray-400 font-bold">Publicité</p>
                </div>
                <div className="flex justify-center p-5">
                    <img className="w-2/3 rounded-3xl" src={image} alt="Laptop-Promotion" />
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default Home;