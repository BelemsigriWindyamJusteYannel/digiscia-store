import './Path.css'
import { ChevronRight } from 'lucide-react';
const Path = () => {
    return <>
        <div className='flex p-5 pl-10 text-gray-400'>
            <p>Accueil</p>
            <ChevronRight />
            <p>Categories</p>
        </div>
    </>
}

export default Path;