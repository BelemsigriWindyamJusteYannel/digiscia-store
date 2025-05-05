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
            <BackBlur/>
            <Header/>
            <Path/>
            <div className="flex p-10 space-x-30">
                <div className="space-y-5">
                    <Filter/>
                    <Categories/>
                </div>
                <List/>
            </div>
            <Footer/>                  
        </div>
    )
}

export default CategoriesPage;