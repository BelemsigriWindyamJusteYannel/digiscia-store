import List from "../Components/list/List";
import Filter from "../Components/sideBars/Filter/Filter";
import Categories from "../Components/sideBars/Categories/Categories";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import FadeInOnScroll from "../Components/fadeInOnScroll/FadeInOnScroll";

const CategoriesPage = () => {
    const { name } = useParams();
    const [ isMobileSize,setIsMobileSize ] = useState(window.innerWidth < 722);
    useEffect(()=>{
        const handleResizing = () => {
            setIsMobileSize(()=>{
                return window.innerWidth < 722;
            })
        };

        window.addEventListener("resize", handleResizing);

        return () => window.removeEventListener('resize',handleResizing);
    },[])

    return(
        <div>
            <div className="flex flex-col items-center p-10 gap-10 sm:flex-row sm:items-start">
                {
                    !isMobileSize ? (
                        <FadeInOnScroll>
                            <div className=" bg-orange-200 p-10 h-fit rounded-2xl sm:sticky top-0">
                                <Filter categoryName={name}/>
                                <Categories/>
                            </div>
                        </FadeInOnScroll>
                    ) : (
                        <p></p>
                    )
                }
                <FadeInOnScroll>
                    <List categoryName={name}/>           
                </FadeInOnScroll>
            </div>             
        </div>
    )
}

export default CategoriesPage;