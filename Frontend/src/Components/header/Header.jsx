import { Menu,Search,UserRound,ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Header.css'
import Login from '../subscription/Login'
import { useContext, useState } from 'react';
import { SearchContext } from '../../Reducer/SearchContext';
import data from '../../pseudoData/data'
import { useNavigate } from 'react-router-dom';
import Hamburger from 'hamburger-react'

const Header = () => {
    const [ searched, setSearched ] = useState('')
    const { searchDispatch } = useContext(SearchContext)
    const navigate = useNavigate();
    const [isOpen, setOpen] = useState(false)
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
        navigate(`${`/CategoriesPage/${searched}`}`)
    }


    return(
        <header className=' flex flex-col w-full bg-amber-500'>
            <div className='flex justify-around items-center pb-1 pt-1 shadow shadow-[#cec46d94] '>
                <p>admin@gmail.com</p>
                <p>Mon compte</p>
            </div>
            <div className='flex flex-col items-start px-10 py-2 space-y-2 sm:flex-row sm:items-center sm:justify-between sm:py-5'>
                <div className='flex space-x-3'>
                    <div className=''>
                        <Hamburger toggled={isOpen} toggle={setOpen}/>
                        {
                            isOpen ? (
                                <div className='absolute top-0 bg-amber-400 right-0 left-0 flex flex-col justify-center items-center'>
                                    <h2> Hello world </h2>
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
                    <button className='flex justify-center items-center w-20 h-full bg-amber-400 rounded-3xl pt-1 pb-1 text-[#000000] hover:bg-amber-500 z-2'>
                        <Search />
                    </button>
                </form>
                <div className='flex justify-around w-full sm:w-50'>
                    <Link to='Connection'>
                        <UserRound className='hover:animate-bounce'/>
                    </Link>
                    <Link to='/Panier'>
                        <ShoppingCart className='hover:animate-bounce'/>
                    </Link>
                </div>
            </div>
        </header>
    )
}

export default Header;