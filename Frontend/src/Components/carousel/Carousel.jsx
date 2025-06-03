import { useEffect, useState } from 'react'
import image1 from './Laptop.jpeg'
import image2 from './laptop-pencils-arrangement.jpg'
import { ChevronRight, ChevronLeft } from 'lucide-react'
import { getProducts } from '../../api/product'

const Carousel = () => {
    const [ currentSlide, setCurrentSlide ] = useState(0);
    const images = getProducts.data.map(item=>item.image);

    const previousSlide = () =>{
        setCurrentSlide((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
    }
    const nextSlide = () =>{
       setCurrentSlide((prev) =>
      prev === images.length - 1 ? 0 : prev + 1
    );

    }
     useEffect(()=>{
        if (images.length === 0) return; // attendre qu'on ait des images

        const interval = setInterval(() => {
            setCurrentSlide(prev => (prev + 1) % images.length);
        }, 5000);

        return () => clearInterval(interval);
    },[])
   

    console.log("images => ",images)
    console.log("images length => ",images.length)
    return(
        <div 
            className='w-full h-5/6 xl:mr-10 overflow-hidden relative flex justify-center border border-[#00000050] rounded-xl'
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
            <img className={`object-cover transition-all duration-3000 ease-in-out rounded-xl`} src={images[currentSlide]} alt="" />         
            <button
                onClick={nextSlide} 
                className='absolute top-1/2 right-2 hover:bg-gray-100 rounded-full p-2 border border-[#00000050]'
            >
                <ChevronRight/>
            </button>
            <button 
                onClick={previousSlide}
                className='absolute top-1/2 left-   2 hover:bg-gray-100 rounded-full p-2 border border-[#00000050]'
            >
                <ChevronLeft/>
            </button>
        </div>
    )
}

export default Carousel;