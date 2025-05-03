import Header from './Components/header/header'
//import BackBlur from './Components/background/BackBlur'
import Categories from './Components/sideBars/Categories/Categories'
import Filter from './Components/sideBars/Filter/Filter'
import Path from './Components/path/Path';
import Item from './Components/item/Item';
import Footer from './Components/footer/Footer'
import './App.css'



const App = () => {
  return(
    <div className='w-full'>
      <Header/>
      <Path/>
      <Filter/>
      <Item/>
      <Footer/>
    </div>
  )
}

export default App
