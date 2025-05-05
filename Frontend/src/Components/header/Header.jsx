import { Menu,Search,UserRound,ShoppingCart } from 'lucide-react';
import './Header.css'
const Header = () => {
    return(
        <header className=' flex-col w-full bg-blue-100'>
            <div className='flex justify-center space-x-190 items-center pb-1 pt-1 shadow-sm '>
                <p>admin@gmail.com</p>
                <p>Mon compte</p>
            </div>
            <div className='flex justify-between p-5 pl-10 pr-10 items-center'>
                <div className='flex space-x-3'>
                    <Menu/>
                    <h2 className='font-extrabold'>DigiScia</h2>
                </div>
                <div className='flex justify-end bg-gray-50 w-md rounded-3xl relative'>
                    <input type='search' className='w-full h-full rounded-3xl pl-4 pt-2 pb-2 absolute z-1 border border-blue-500 text-gray-500' placeholder='Search product...'/>
                    <button className='flex justify-center items-center w-20 h-full bg-blue-500 rounded-3xl pt-1 pb-1 text-white hover:bg-blue-400 z-2'>
                        <Search />
                    </button>
                </div>
                <div className='flex justify-between w-25'>
                    <UserRound />
                    <ShoppingCart />
                </div>
            </div>
        </header>
    )
}

export default Header;