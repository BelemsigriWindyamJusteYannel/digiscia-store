
import Categories from '../Categories/Categories';
import './Filter.css';

const Filter = () => {
    return(
        <>
            <div className='border border-gray-100 w-60 rounded-3xl p-5 space-y-2'>
                <div className='rounded-xl pt-1 pb-1 flex justify-center bg-gray-200'>
                    <h2 className='font-bold'>Filter</h2>
                </div>
                <div>
                    <h3 className='border-b'>Filtrer par prix</h3>
                    <div className='flex justify-center items-center space-x-1'>
                        <p>50DHS</p>
                        <div className='border w-full h-0'>
                        </div>
                        <p>20000DHS</p>
                    </div>
                </div>
            </div>
            <Categories/>
        </>
        
    )
}

export default Filter;

