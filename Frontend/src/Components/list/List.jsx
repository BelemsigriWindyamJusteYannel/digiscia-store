import './List.css'
import Item from '../item/Item';

const List = () => {
    return(
        <div className='w-full p-10 space-y-5 bg-gray-200 rounded-sm'>
            <div className='flex w-full justify-between sm:pl-5 sm:pr-5'>
                <h2>Boutique</h2>
                <h2>Nombre de résultat</h2>
            </div>
            <div className='flex-col w-full space-y-10'>
                <div className='w-full h-10 bg-blue-300 rounded-sm'>

                </div>
                <div className='flex flex-wrap gap-5 justify-center'>
                    <Item/>
                    <Item/>
                    <Item/>
                    <Item/>
                    <Item/>
                    <Item/>
                    <Item/>
                    <Item/>
                    <Item/>
                    <Item/>
                    <Item/>
                </div>
            </div>
            <div className='flex flex-col space-y-1 items-end sm:flex-row sm:justify-between'>
                <p>Affichage de i à Total</p>
                <div className='flex gap-3 justify-center items-center'>
                    <div className='w-7 h-7 bg-gray-200 rounded-full text-gray-500 flex justify-center items-center'>
                        <p>1</p>
                    </div>
                    <div className='w-7 h-7 bg-gray-200 rounded-full text-gray-500 flex justify-center items-center'>
                        <p>1</p>
                    </div>
                    <div className='w-7 h-7 bg-gray-200 rounded-full text-gray-500 flex justify-center items-center'>
                        <p>1</p>
                    </div>
                    <p>...</p>
                    <div className='w-7 h-7 bg-gray-200 rounded-full text-gray-500 flex justify-center items-center'>
                        <p>1</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default List;