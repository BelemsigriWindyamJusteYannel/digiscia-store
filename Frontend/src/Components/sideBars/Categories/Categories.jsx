import './Categories.css';

const Categories = () =>{
    return(
        <div className='border border-gray-100 w-60 rounded-3xl p-5'>
            <div className='rounded-xl pt-2 pb-2 flex justify-center bg-blue-400'>
                <h2 className='font-bold'>Categories</h2>
            </div>
            <ul>
                <li>Arduino</li>
                <li>Ordinateur</li>
                <li>Controllers</li>
                <li>Disque Dures</li>
                <li>Raspberry Pi</li>
                <li>Clé USB</li>
            </ul>
        </div>
    )
}

export default Categories;