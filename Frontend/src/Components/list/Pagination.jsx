import Item from "../item/Item";

const Pagination = ({pageContent}) => {

    return(
        <div className='flex flex-wrap gap-5 justify-center items-center'>
        {
            pageContent.map((item,index)=>
                <Item 
                    key={index}  
                    id={item.id} 
                    name={item.name} 
                    description={item.description} 
                    price={item.current_price} 
                    image={item.image} 
                    stock={item.stock} 
                    category={item.category}
                />
            )
        }
    </div>
    )
}

export default Pagination;