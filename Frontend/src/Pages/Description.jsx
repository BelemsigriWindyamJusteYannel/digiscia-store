import Header from "../Components/header/Header";
import Path from "../Components/path/Path";
import BackBlur from "../Components/background/BackBlur";
import Footer from "../Components/footer/Footer";
import Details from "../Components/details/Details";
import Filter from "../Components/sideBars/Filter/Filter";
import Categories from "../Components/sideBars/Categories/Categories";
 

const Description = () => {
    return (
        <div className="relative bottom-0 top-0">
            <BackBlur/>
            <Header/>
            <Path/>
            <div className="flex p-10">
                <div className="space-y-5">
                    <Filter/>
                    <Categories/>
                </div>
                <Details/>
            </div>
            <Footer/>
        </div>
    )
}

export default Description;