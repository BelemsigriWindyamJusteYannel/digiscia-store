import { Menu,Search,UserRound,ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Header.css'
import { useContext, useState, useEffect } from 'react';
import { SearchContext } from '../../Reducers/search/SearchContext';
//import data from '../../pseudoData/data'
import { useNavigate } from 'react-router-dom';
//import Hamburger from 'hamburger-react'
//import { exemples } from '../sideBars/Categories/exmples';
import { cartContext } from '../../Reducers/cart/cartContext';
import { getCategories } from '../../api/category';
import { getProducts,searchProduct } from '../../api/product';
import { getProfile } from '../../api/user';
import Categories from '../sideBars/Categories/Categories';
import Signin from '../Signin';
import Hamburger from '../Hamburger';
import { Button } from '../ui/button';
import Profile from '../Profile';


const Header = () => {
    const [ profile, setProfile ] = useState({})
    const [ searched, setSearched ] = useState('')
    const { searchDispatch } = useContext(SearchContext)
    const navigate = useNavigate();
    //const [isOpen, setOpen] = useState(false)
    const { cart } = useContext(cartContext)
    const [ isMobileSize,setIsMobileSize ] = useState(window.innerWidth < 1283);
    const handleSearchSubmit = async (e) => {
        e.preventDefault();
        const result = await searchProduct(searched)
        console.log("searched data =>", result);
        searchDispatch({
            type:'search/specific',
            payload: {
                data: result
            }
        })
        setSearched(()=>'')
        if(searched){
            navigate(`${`/CategoriesPage/${searched}`}`)
        }
    }

    useEffect(()=>{
        getProfile().then(data => {
            setProfile(data);
        });

        const handleResizing = () => {
            setIsMobileSize(()=>{
                return window.innerWidth < 1283;
            })
        };

        window.addEventListener("resize", handleResizing);

        return () => window.removeEventListener('resize',handleResizing);
    },[])

    return(
        <div className='flex flex-col items-start px-10 py-2 space-y-2 md:flex-row md:items-center md:justify-between md:py-5 bg-orange-400 shadow-2xl rounded-xl'>
            <div className='flex space-x-3 items-center mr-1'>
                <div className=''>
                    {
                        isMobileSize ? (
                            <Hamburger/>
                        ) : (
                            <></>
                        )
                    }
                    
                </div>
                <Link to='/'>
                    <h2 className='font-extrabold text-xl'>DigiSciaStore</h2>
                </Link>
            </div>
            <form onSubmit={(e) => handleSearchSubmit(e)} className="relative flex w-full md:w-96 rounded-lg bg-white shadow-md">
                    <input
                        type="search"
                        className="w-full py-3 pl-12 pr-4 text-gray-800 placeholder-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                        placeholder="Find your perfect product..."
                        value={searched}
                        onChange={(e) => setSearched(e.target.value)}
                    />
                    <button
                        type="submit"
                        className="absolute left-0 top-0 bottom-0 flex items-center px-3 text-gray-600 hover:text-orange-500 focus:outline-none"
                        aria-label="Search"
                    >
                        {/* Assuming 'Search' is an SVG icon component */}
                        <Search className="h-5 w-5" />
                    </button>
            </form>
            <div className='flex items-center justify-around w-full sm:w-1/3 pl-5'>
                <Link to='/Panier' className='relative'>
                    <div className='p-2 bg-[#fff] rounded-full border border-gray-300'>
                        <ShoppingCart className='hover:scale-125 hover:duration-300'/>
                    </div>
                    <div className='bg-red-500 rounded-full text-center text-[#fff] absolute top-0 -right-4 sm:-top-3 sm:-right-2 w-5 animate-bounce'>
                        <p>{cart.length}</p>
                    </div>
                </Link>
                <div className='flex items-center gap-3 pl-3'>
                    <Link to={`/Connection`}>
                        <Button 
                            variant="outline"
                            className="border border-gray-300"
                        >
                            Sign in
                        </Button>
                    </Link>
                    <div>
                        {
                            profile.first_name ?(
                                <div className='flex flex-col items-center'>
                                    <Link to='Connection'>
                                        <Profile/>
                                    </Link>
                                    <h2 className='text-xs font-extralight text-center'>{profile.first_name} {profile.last_name}</h2>
                                </div>
                            ) : (
                                <div>

                                </div>

                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header;