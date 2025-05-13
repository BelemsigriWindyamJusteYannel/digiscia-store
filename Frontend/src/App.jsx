import './App.css'
import { BrowserRouter ,Routes ,Route } from 'react-router-dom';
import Home from './Pages/Home';
import Description from './Pages/Description';
import CategoriesPage from './Pages/CategoriesPage';
import Panier from './Pages/Panier';
import BackBlur from './Components/background/BackBlur';
import Header from './Components/header/Header';
import Path from './Components/path/Path';
import Footer from './Components/footer/Footer';
import Connection from './Pages/Connection';
import { CartProvider } from './Reducer/cartContext';
import { SearchContextProvider } from './Reducer/SearchContext';

const App = () => {
  return(
    <SearchContextProvider>
      <CartProvider>
        <BrowserRouter>
          <BackBlur/>
          <Header/>
          <Path/>
          <Routes>
              <Route path='/' element={<Home/>}></Route>
              <Route path='/Description/:name' element={<Description/>}></Route>
              <Route path='/Panier' element={<Panier/>}></Route>
              <Route path='/CategoriesPage/:name' element={<CategoriesPage/>}></Route>
              <Route path='/Connection' element={<Connection/>}></Route>
          </Routes>
          <Footer/>
        </BrowserRouter>
      </CartProvider>
    </SearchContextProvider>
  )
}

export default App
