import { useState } from 'react'
import image1 from './Laptop.jpeg'
import image2 from './laptop-pencils-arrangement.jpg'
import { ChevronRight, ChevronLeft } from 'lucide-react'

const Carousel = () => {
    const [ currentSlide, setCurrentSlide ] = useState(0);
    const images = [
        image1,
        image2,
        "https://cdn-dynmedia-1.microsoft.com/is/image/microsoftcorp/MSFT-All-in-One_1040x585?scl=1",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShBTtdtQjxDYY-josQ3WbAntYW74D745x3-A&s",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtLWZsodryzIB3CWC04ZLVvj5ulnZ2I4BLwg&s",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1-HnRKy5QbUddedUIzu9p164_zxgCA7ZQXw&s",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBMYgtIH0xyIT728jbXWsfxKeSLD4tdTUpTQ&s"
    ]

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

    return(
        <div className='w-80 sm:w-150 md:w-200 md:h-120 md:mr-30 relative 2xl:mr-100 flex justify-center'>
            <img className='w-full rounded-2xl' src={images[currentSlide]} alt="" />         
            <div className='flex absolute bottom-0 gap-1 p-5'>
                <div className="bg-black w-3 h-3 rounded-full "></div>
                <div className="bg-black w-3 h-3 rounded-full "></div>
                <div className="bg-black w-3 h-3 rounded-full "></div>
            </div>
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