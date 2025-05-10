import Header from "../Components/header/Header";
import Path from "../Components/path/Path";
import BackBlur from "../Components/background/BackBlur";
import Footer from "../Components/footer/Footer";
import Details from "../Components/details/Details";
import Filter from "../Components/sideBars/Filter/Filter";
import Categories from "../Components/sideBars/Categories/Categories";
 

const Description = () => {
    return (
        <div className="flex-col justify-between h-max">
            <div className="flex p-10">
                <div className="space-y-5 bg-gray-200 p-10 h-screen rounded-2xl sticky top-0">
                    <Filter/>
                    <Categories/>
                </div>
                <Details/>
            </div>
        </div>
    )
}

export default Description;