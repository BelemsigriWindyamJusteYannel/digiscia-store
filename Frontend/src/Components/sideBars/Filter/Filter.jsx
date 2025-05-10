
import Categories from '../Categories/Categories';
import './Filter.css';

const Filter = () => {
    return(
        <>
            <div className='border border-gray-200 w-60 rounded-sm p-5 space-y-5  '>
                <div className='rounded-xl py-2 flex justify-center bg-blue-400'>
                    <h2 className='font-bold'>Filter</h2>
                </div>
                <div className='space-y-5'>
                    <h3 className='border-b border-gray-400'>Filtrer par prix</h3>
                    <div className='flex justify-between space-x-1'>
                        <p>50DHS</p>
                        <p>20000DHS</p>
                    </div>
                    <div className='flex items-center gap-0.5'>
                        <div className='w-5 h-2 rounded-full bg-gray-400'></div>
                        <div className='border border-gray-500 w-full h-0'>
                        </div>
                        <div className='w-5 h-2 rounded-full bg-red-600'></div>
                    </div>
                    <button type="button" class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 ">Light</button>
                </div>
            </div>
        </>
        
    )
}

export default Filter;


