import { useParams } from "react-router-dom";


const CheckOut = () => {
    const { totalPrice } = useParams();
    console.log(totalPrice)
    return(
        <div>

        </div>
    )
}

export default CheckOut;