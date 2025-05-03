import { Menu,Search,UserRound,ShoppingCart } from 'lucide-react';
import './Header.css'
const Header = () => {
    return(
        <header className=' flex-col w-full '>
            <div className='flex justify-center space-x-190 items-center pb-1 pt-1 border-b border-gray-100'>
                <p>admin@gmail.com</p>
                <p>Mon compte</p>
            </div>
            <div className='flex justify-between p-5 pl-10 pr-10 items-center '>
                <div className='flex space-x-3'>
                    <Menu/>
                    <h2 className='font-extrabold'>ElectroInfos</h2>
                </div>
                <div className='flex bg-gray-50 w-md rounded-3xl items-center'>
                    <input className='w-full h-full rounded-3xl pl-4 pt-1 pb-1 ' type="text" placeholder='Search product...'/>
                    <div className='flex justify-center items-center w-20 h-full bg-blue-500 rounded-3xl pt-1 pb-1'>
                        <Search />
                    </div>
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