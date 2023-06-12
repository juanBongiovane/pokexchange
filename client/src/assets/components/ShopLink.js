import * as React from "react";
import '../../assets/styles/PokemonShop.css';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import {Navigate, useNavigate} from "react-router-dom";
import {Link} from "@mui/material";


const ShopLink = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('../shop');
    };

    return (
        <Link to="/tienda" onClick={handleClick} style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className="shop">
                <ShoppingCartCheckoutIcon />
                <span className="shop-text">Tienda</span>
            </div>
        </Link>
    );
}
export default ShopLink;