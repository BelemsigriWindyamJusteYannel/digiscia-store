import Categories from "../Components/sideBars/Categories/Categories";
import Item from "../Components/item/Item";
import image from "./Laptop.jpeg"
import { useEffect, useState } from "react";
//import products from '../pseudoData/data'
import Carousel from "../Components/carousel/Carousel";
import { products } from "../test_API/test";

const Home = () => {
    const [ time, setTime ] = useState(10)
    useEffect(()=>{
        if(time > 0){
            setInterval(()=>{
                setTime((prev)=>{
                    return prev - 1;
                })
            },1000)
        }
    },[])

    return(
        <div>
            <div className="flex flex-col gap-5 items-center p-10  bg-amber-300 sm:flex-row sm:justify-between shadow-2xl">
                <Categories/>
                <Carousel/>
            </div>
            <div className="p-10 space-y-5 overflow-hidden bg-amber-600 flex flex-col items-center">
                <div className="flex justify-center">
                    <p className=" font-bold text-4xl">Products</p>
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
            </div>
            {
                time > 0 ? (
                    <div className="p-10 space-y-5 overflow-hidden bg-amber-400 flex flex-col items-center">
                        <div className="flex w-full justify-around">
                            <p className="text-3xl font-bold">- Flash Sell</p>
                            <div className="w-1/2">
                                <h3 className="font-bold">Temps restant: {time} </h3>
                            </div>
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
                    </div>
                ) : (
                    <><p className="font-bold text-red-400">Vente Flash terminée</p></>
                )
            }
        </div>
    )
}

export default Home;