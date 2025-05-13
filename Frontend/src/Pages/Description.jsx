import Header from "../Components/header/Header";
import Path from "../Components/path/Path";
import BackBlur from "../Components/background/BackBlur";
import Footer from "../Components/footer/Footer";
import Details from "../Components/details/Details";
import Filter from "../Components/sideBars/Filter/Filter";
import Categories from "../Components/sideBars/Categories/Categories";
 

const Description = () => {
    return (
        <div>
            <div className="flex flex-col items-center gap-10 p-10 xl:flex-row xl:items-start xl:justify-between">
                <div className="space-y-5 bg-amber-100 p-10 h-screen rounded-2xl xl:sticky top-0">
                    <Filter/>
                    <Categories/>
                </div>
                <Details/>
            </div>
        </div>
    )
}

export default Description;