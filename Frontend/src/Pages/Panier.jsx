import { useContext } from "react";
import Cart from "../Components/cart/Cart";
import { uContext } from "../Reducers/user/uContext";
const Panier  = () => {
    const { user } = useContext(uContext);
    console.log("user =>",user)
    return(
        <Cart/>
    )
}

export default Panier;