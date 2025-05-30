import image from '../carousel/Laptop.jpeg'
import { getProducts } from '../../api/product';
import { cancelCommandById,getCommands } from '../../api/command';
const CommandItem = ({ order }) =>{

    console.log("order =>",order)
    return(
        <div className='border border-gray-200 p-5 rounded-sm space-y-5'>
            <h2 className='font-bold'>Date : {order.order_date}</h2>
            <div>
                <h1 className='font-bold'>Etat de livraison produit : { order.status }</h1>
                <p className='text-justify'>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Non inventore
                    recusandae ex sit, totam, error repudiandae veniam fuga atque debitis
                    laborum veritatis ea cum repellat voluptate odio cupiditate, quod fugit.
                </p>
            </div>
            {
                order.order_products.map((item,index)=>{
                    // Getting the whole product from products to have the image of the product
                    const product = getProducts.data.find((element)=>element.name == item.product_name)
                    console.log("product =>", product);
                    return (
                        <div key={index} className='sm:flex gap-5 border border-gray-200 p-2 rounded-xl'>
                            <div className='w-20'>
                                <img src={product.image} alt="" />
                            </div>
                            <div>
                                <h2 className='font-bold'>Nom produit : {item.product_name} </h2>
                                <p>Quantity : {item.quantity}</p>
                                <p>Unit price : {item.oneself_price} </p>
                            </div>
                        </div>
                    )
                })
            }
            <div className='flex justify-between'>
                <p className='font-bold'>prix total : {order.total_amount}</p>
                <button 
                    className='bg-red-400 p-3 rounded-2xl text-white hover:bg-red-500'
                    onClick={()=>{
                        cancelCommandById(order.id)
                        .then(data=>{
                            console.log("onclick=>",data);
                            alert("Commande annuler avec succès");
                            window.location.href = window.location.href;
                        })
                        .catch(error=>{
                            console.log("Error => ",error)
                        })
                    }}
                >
                    Cancel order
                </button>
            </div>
        </div>
    )
}

export default CommandItem;