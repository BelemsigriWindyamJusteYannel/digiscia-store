import { useEffect, useState } from 'react'
import image1 from './Laptop.jpeg'
import image2 from './laptop-pencils-arrangement.jpg'
import { ChevronRight, ChevronLeft } from 'lucide-react'
import { getProducts } from '../../api/product'

const Carousel = () => {
    const [ currentSlide, setCurrentSlide ] = useState(0);
    const images = getProducts.data.map(item=>item.image);

    const previousSlide = () =>{
        if(currentSlide===0){
            return setCurrentSlide(()=>{
                return images.length - 1;
            })
        }
        return setCurrentSlide(()=>{
            return currentSlide - 1;
        })
    }
    const nextSlide = () =>{
        if(currentSlide=== images.length - 1){
            return setCurrentSlide(()=>{
                return 0;
            })
        }
        return setCurrentSlide(()=>{
            return currentSlide + 1;
        })
    }
     useEffect(()=>{
        if (images.length === 0) return; // attendre qu'on ait des images

        const interval = setInterval(() => {
            setCurrentSlide(prev => (prev + 1) % images.length);
        }, 5000);

        return () => clearInterval(interval);
    },[images])
   

    console.log("images => ",images)
    console.log("images length => ",images.length)
    return(
        <div className='w-80 sm:w-150 md:w-200 md:h-120 md:mr-30 relative 2xl:mr-100 flex justify-center'>
            <img className='w-full  object-cover transition-all duration-700 ease-in-out rounded-2xl shadow-xl' src={images[currentSlide]} alt="" />         
            <button
                onClick={nextSlide} 
                className='absolute top-1/2 right-0 bg-gray-100 hover:bg-gray-300 rounded-full p-3 mr-5'
            >
                <ChevronRight/>
            </button>
            <button 
                onClick={previousSlide}
                className='absolute top-1/2 left-0 bg-gray-100 hover:bg-gray-300 rounded-full p-3 ml-5'
            >
                <ChevronLeft/>
            </button>
        </div>
    )
}

export default Carousel;