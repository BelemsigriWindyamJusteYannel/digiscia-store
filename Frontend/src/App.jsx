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
import MonCompte from './Pages/MonCompte';
import Commande from './Pages/Commande';
import BoiteReception from './Pages/BoiteReception';

const App = () => {
  return(
    <div>
      <SearchContextProvider>
        <CartProvider>
          <BrowserRouter>
            
            <Header/>
            <Path/>
            <Routes>
                <Route path='/' element={<Home/>}></Route>
                <Route path='/Description/:name' element={<Description/>}></Route>
                <Route path='/Panier' element={<Panier/>}></Route>
                <Route path='/CategoriesPage/:name' element={<CategoriesPage/>}></Route>
                <Route path='/Connection' element={<Connection/>}></Route>
                <Route path='/Compte' element={<MonCompte/>}></Route>
                <Route path='/Commandes' element={<Commande/>}></Route>
                <Route path='/BoiteReception' element={<BoiteReception/>}></Route>
            </Routes>
            <Footer/>
          </BrowserRouter>
        </CartProvider>
      </SearchContextProvider>
    </div>
  )
}

export default App
