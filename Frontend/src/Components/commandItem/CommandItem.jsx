import image from '../carousel/Laptop.jpeg'

const CommandItem = () =>{
    return(
        <div className='border border-gray-200 p-5 rounded-sm space-y-5'>
            <h2 className='font-bold'>Date : 10 juin</h2>
            <div>
                <h1 className='font-bold'>Etat de livraison produit</h1>
                <p className='text-justify'>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Non inventore
                    recusandae ex sit, totam, error repudiandae veniam fuga atque debitis
                    laborum veritatis ea cum repellat voluptate odio cupiditate, quod fugit.
                </p>
            </div>
            <div className='sm:flex gap-5 border border-gray-200 p-2 rounded-xl'>
                <img src={image} alt="" />
                <div>
                    <h2 className='font-bold'>Nom produit</h2>
                    <p className='text-justify'>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                        Veniam totam laboriosam vero deleniti ipsam non hic eos,
                        voluptatem dolor eveniet iure at ipsa perferendis nemo. Ex placeat maiores obcaecati eum!
                    </p>
                    <p className='font-bold'>prix</p>
                </div>
            </div>
        </div>
    )
}

export default CommandItem;