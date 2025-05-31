import List from "../Components/list/List";
import Filter from "../Components/sideBars/Filter/Filter";
import Categories from "../Components/sideBars/Categories/Categories";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import FadeInOnScroll from "../Components/fadeInOnScroll/FadeInOnScroll";

const CategoriesPage = () => {
    const { name } = useParams();
    const [ isMobileSize,setIsMobileSize ] = useState(window.innerWidth < 769);
    useEffect(()=>{
        const handleResizing = () => {
            setIsMobileSize(()=>{
                return window.innerWidth < 769;
            })
        };

        window.addEventListener("resize", handleResizing);

        return () => window.removeEventListener('resize',handleResizing);
    },[])

    return(
        <div className="flex flex-col items-center md:items-start justify-between md:flex-row w-full sm:pr-10">
            <div className="flex flex-col items-center p-10 gap-10 sm:items-start">
                {
                    !isMobileSize ? (
                        <FadeInOnScroll>
                            <div className=" bg-orange-200 p-10 h-fit rounded-2xl sm:sticky top-0">
                                <Filter categoryName={name}/>
                                <Categories/>
                            </div>
                        </FadeInOnScroll>
                    ) : (
                        <></>
                    )
                }
            </div>
            <div className="flex-auto">
                <FadeInOnScroll>
                    <List categoryName={name}/>           
                </FadeInOnScroll>     
            </div>            
        </div>
    )
}

export default CategoriesPage;