import Header from "../Components/header/Header";
import Path from "../Components/path/Path";
import BackBlur from "../Components/background/BackBlur";
import Footer from "../Components/footer/Footer";
import List from "../Components/list/List";
import Filter from "../Components/sideBars/Filter/Filter";
import Categories from "../Components/sideBars/Categories/Categories";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

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
                        <div className=" bg-amber-100 p-10 h-fit rounded-2xl sm:sticky top-0">
                            <Filter/>
                            <Categories/>
                        </div>
                    ) : (
                        <p></p>
                    )
                }
                <List categoryName={name}/>
            </div>             
        </div>
    )
}

export default CategoriesPage;