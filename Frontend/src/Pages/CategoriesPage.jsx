import Header from "../Components/header/Header";
import Path from "../Components/path/Path";
import BackBlur from "../Components/background/BackBlur";
import Footer from "../Components/footer/Footer";
import List from "../Components/list/List";
import Filter from "../Components/sideBars/Filter/Filter";
import Categories from "../Components/sideBars/Categories/Categories";

const CategoriesPage = () => {
    return(
        <div>
            <div className="flex p-10 space-x-30">
                <div className="space-y-5 bg-gray-200 p-10 h-fit rounded-2xl sticky top-0">
                    <Filter/>
                    <Categories/>
                </div>
                <List/>
            </div>             
        </div>
    )
}

export default CategoriesPage;