import Header from "../Components/header/Header";
import Path from "../Components/path/Path";
import BackBlur from "../Components/background/BackBlur";
import Footer from "../Components/footer/Footer";
import List from "../Components/list/List";
import Filter from "../Components/sideBars/Filter/Filter";
import Categories from "../Components/sideBars/Categories/Categories";
import { useParams } from "react-router-dom";

const CategoriesPage = () => {
    const { name } = useParams();

    return(
        <div>
            <div className="flex flex-col items-center p-10 gap-10 sm:flex-row sm:items-start">
                <div className=" bg-amber-100 p-10 h-fit rounded-2xl sm:sticky top-0">
                    <Filter/>
                    <Categories/>
                </div>
                <List categoryName={name}/>
            </div>             
        </div>
    )
}

export default CategoriesPage;