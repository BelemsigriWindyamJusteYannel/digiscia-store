import Categories from "../Components/sideBars/Categories/Categories";
import Item from "../Components/item/Item";
//import image from "./Laptop.jpeg"
import { useEffect, useState, useRef } from "react";
//import products from '../pseudoData/data'
import Carousel from "../Components/carousel/Carousel";
//import { products } from "../test_API/test";
import "../App.css"
import FadeInOnScroll from "../Components/fadeInOnScroll/FadeInOnScroll";
import { getProducts } from "../api/product";

const Home = () => {
    const [visible, setVisible] = useState(false);
    const [ isMobileSize,setIsMobileSize ] = useState(window.innerWidth < 1115);

  // 🎯 Date cible = maintenant + 7 jours
  const targetDate = new Date();
  targetDate.setDate(targetDate.getDate() + 7);

  // 🧠 Fonction pour calculer le temps restant
  const calculateTimeLeft = () => {
    const difference = targetDate - new Date();
    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    // ⏱ Afficher l'élément après 100ms
    const timeout = setTimeout(() => {
      setVisible(true);
    }, 100);

    // 🔁 Lancer le compte à rebours
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    // Resizing
    const handleResizing = () => {
        setIsMobileSize(()=>{
            return window.innerWidth < 1115;
        })
    };

    window.addEventListener("resize", handleResizing);
    // 🧹 Nettoyage des timers et la suppression de l'écouteur
    return () => {
        clearTimeout(timeout);
        clearInterval(interval);
        window.removeEventListener('resize',handleResizing);
    };

    

  }, []);

    return(
        <div>
            <div className={`w-full flex gap-10 items-center  p-10 flex-row xl:justify-between shadow-xl h-screen transition-opacity duration-1000 ease-out ${
        visible? "opacity-100" : "opacity-0"}`}>
                {
                    !isMobileSize ?(
                        <Categories/>
                    ) : (
                        <></>
                    )
                }
                <div className="w-full h-full">
                    <Carousel/>
                </div>
            </div>
            <FadeInOnScroll>
                <div className={`p-10 space-y-5 overflow-hidden  flex flex-col items-center justify-around h-screen`}>
                    <div className="flex justify-center">
                        <p className=" font-bold text-4xl">Products</p>
                    </div>
                    <div className="flex overflow-x-auto gap-5 w-full p-5 scroll-smooth no-scrollbar">
                        {
                            getProducts.data.map((product,index)=>(
                                <Item key={index}
                                    id={product.id}
                                    name={product.name}
                                    description={product.description}
                                    price= {product.current_price}
                                    stock= {product.stock}
                                    category= {product.category}
                                    image={product.image}
                                />
                            ))
                        }
                    </div>
                </div>
            </FadeInOnScroll>
            {
                (timeLeft.days > 0 || timeLeft.hours > 0 || timeLeft.minutes > 0 || timeLeft.seconds > 0) > 0 ? (
                    <FadeInOnScroll>
                        <div className={`p-10 space-y-5 overflow-hidden bg-orange-500 flex flex-col items-center justify-around h-screen`}>
                            <div className="flex w-full justify-around">
                                <p className="text-3xl font-bold">- Flash Sell</p>
                                <div className="w-1/2">
                                    <h3 className="font-bold">Temps restant: {timeLeft.days} jour{timeLeft.days !== 1 && "s"}{" "}
            {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s </h3>
                                </div>
                            </div>
                            <div className="flex overflow-x-auto gap-5 w-full p-5 scroll-smooth no-scrollbar">
                                {
                                    getProducts.data.map((product,index)=>{
                                        console.log(product)
                                        if(product.promotion >= 80){
                                            return(
                                                <Item key={index}
                                                    id={product.id}
                                                    name={product.name}
                                                    description={product.description}
                                                    price= {product.current_price}
                                                    stock= {product.stock}
                                                    category= {product.category}
                                                    image={product.image}
                                                />
                                            )
                                        }
                                    })
                                }
                            </div>
                        </div>
                    </FadeInOnScroll>
                ) : (
                    <><p className="font-bold text-red-400">Vente Flash terminée</p></>
                )
            }
        </div>
    )
}

export default Home;