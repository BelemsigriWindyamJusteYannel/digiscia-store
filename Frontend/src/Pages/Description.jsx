import Details from "../Components/details/Details";
import Filter from "../Components/sideBars/Filter/Filter";
import Categories from "../Components/sideBars/Categories/Categories";
import { useEffect, useState } from "react";


const Description = () => {
    const [ isMobileSize,setIsMobileSize ] = useState(window.innerWidth < 1283);
    useEffect(()=>{
        const handleResizing = () => {
            setIsMobileSize(()=>{
                return window.innerWidth < 1283;
            })
        };

        window.addEventListener("resize", handleResizing);

        return () => window.removeEventListener('resize',handleResizing);
    },[])

    return (
        <div>
            <div className="flex flex-col items-center gap-10 p-10 xl:flex-row xl:items-start xl:justify-between">
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
                <Details/>
            </div>
        </div>
    )
}

export default Description;