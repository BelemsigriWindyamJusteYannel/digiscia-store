import { Menu,Search,UserRound,ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Header.css'
import { useContext, useState } from 'react';
import { SearchContext } from '../../Reducer/SearchContext';
import data from '../../pseudoData/data'
import { useNavigate } from 'react-router-dom';
import Hamburger from 'hamburger-react'
import { exemples } from '../sideBars/Categories/exmples';
import { cartContext } from '../../Reducer/cartContext';

const Header = () => {
    const [ searched, setSearched ] = useState('')
    const { searchDispatch } = useContext(SearchContext)
    const navigate = useNavigate();
    const [isOpen, setOpen] = useState(false)
    const { cart } = useContext(cartContext)
    const handleSearchSubmit = (e) => {
        e.preventDefault();
        searchDispatch({
            type:'search/global',
            payload: {
                target: searched,
                data: data
            }
        })
        setSearched(()=>'')
        if(searched){
            navigate(`${`/CategoriesPage/${searched}`}`)
        }
    }


    return(
        <header className=' flex flex-col w-full bg-amber-500'>
            <div className='flex justify-around items-center pb-1 pt-1 shadow shadow-[#cec46d94] '>
                <p>admin@gmail.com</p>
                <Link to='/Compte'>
                    <p>Mon compte</p>
                </Link>
            </div>
            <div className='flex flex-col items-start px-10 py-2 space-y-2 sm:flex-row sm:items-center sm:justify-between sm:py-5'>
                <div className='flex space-x-3 items-center'>
                    <div className=''>
                        <Hamburger toggled={isOpen} toggle={setOpen}/>
                        {
                            isOpen ? (
                                <div className='absolute top-0 bg-amber-400 right-0 left-0 flex flex-col justify-start items-center z-10 h-90 gap-5 sm:right-2/3 sm:h-screen sm:'>
                                    <div>
                                    <Hamburger toggled={isOpen} toggle={setOpen}/>
                                    </div>
                                    <ul className='flex flex-col items-center gap-2'>
                                        {
                                            exemples.map((categorie, index)=>(
                                                <Link to={`/CategoriesPage/${categorie.name}`} key={index}>
                                                    <li 
                                                        className='hover:text-[#fff] hover:scale-100 font-bold' 
                                                        onClick={()=>{
                                                            setOpen((prev)=>{
                                                                return false;
                                                            })
                                                        }}
                                                    >
                                                        {categorie.name}
                                                    </li>
                                                </Link>
                                            ))
                                        }
                                    </ul>
                                </div>
                            ): (
                                <p className='absolute top-0'></p>
                            )
                        }
                    </div>
                    <Link to='/'>
                        <h2 className='font-extrabold'>DigiScia</h2>
                    </Link>
                </div>
                <form onSubmit={(e)=>handleSearchSubmit(e)} className='flex w-full justify-end bg-amber-200 rounded-3xl relative sm:w-60 md:w-110'>
                    <input 
                    type='search' 
                    className='w-full h-full rounded-3xl pl-4 pt-2 pb-2 absolute z-1 text-[#000]' 
                    placeholder='Search product...' 
                    value={searched} 
                    onChange={(e)=>{
                        setSearched(()=>{
                            return e.target.value;
                        })
                    }}
                    />
                    <button className='flex justify-center items-center w-20 h-full bg-amber-400 rounded-3xl pt-1 pb-1 text-[#000000] hover:bg-amber-700 z-2'>
                        <Search />
                    </button>
                </form>
                <div className='flex justify-around w-full sm:w-50'>
                    <Link to='Connection'>
                        <UserRound className='hover:animate-bounce'/>
                    </Link>
                    <Link to='/Panier' className='relative'>
                        <ShoppingCart className='hover:animate-bounce'/>
                        <div className='bg-red-500 rounded-full text-center text-[#fff] absolute top-0 -right-4 sm:-top-3 sm:-right-2 w-5 animate-bounce'>
                            <p>{cart.length}</p>
                        </div>
                    </Link>
                </div>
            </div>
        </header>
    )
}

export default Header;