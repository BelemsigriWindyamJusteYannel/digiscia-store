import { Menu,Search,UserRound,ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Header.css'
import Login from '../subscription/Login'
const Header = () => {
    const handleSigning = () => {
        return(
            <div className='absolute'>
                <Login/>
            </div>
        )
    }

    return(
        <header className=' flex flex-col w-full bg-[#aed2e683]'>
            <div className='flex justify-around items-center pb-1 pt-1 shadow shadow-blue-200 '>
                <p>admin@gmail.com</p>
                <p>Mon compte</p>
            </div>
            <div className='flex flex-col items-start px-10 py-2 space-y-2 sm:flex-row sm:items-center sm:justify-between sm:py-5'>
                <div className='flex space-x-3'>
                    <Menu/>
                    <Link to='/'>
                        <h2 className='font-extrabold'>DigiScia</h2>
                    </Link>
                </div>
                <div className='flex w-full justify-end bg-gray-50 rounded-3xl relative sm:w-60 md:w-110'>
                    <input type='search' className='w-full h-full rounded-3xl pl-4 pt-2 pb-2 absolute z-1 text-gray-500' placeholder='Search product...'/>
                    <button className='flex justify-center items-center w-20 h-full bg-blue-500 rounded-3xl pt-1 pb-1 text-white hover:bg-blue-400 z-2'>
                        <Search />
                    </button>
                </div>
                <div className='flex justify-around w-full sm:w-50'>
                    <UserRound className='hover:animate-bounce' onClick={handleSigning}/>
                    <Link to='/Panier'>
                        <ShoppingCart className='hover:animate-bounce'/>
                    </Link>
                </div>
            </div>
        </header>
    )
}

export default Header;