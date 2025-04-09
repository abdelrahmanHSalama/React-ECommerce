import { useSelector } from "react-redux";
import CartButton from "./CartButton";
import FavouritesButton from "./FavouritesButton";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
    const { user } = useSelector((state) => state.auth);

    return (
        <div className="w-full sm:w-[48%] lg:w-[32%] xl:w-[19.5%] border p-2 border-blue-700 rounded-lg flex flex-col">
            <Link to={`/products/${product.id}`} className="no-underline">
                <img
                    src={product.thumbnail}
                    alt={product.name}
                    className="w-full aspect-square object-cover"
                />
            </Link>
            <div className="flex-1 flex flex-col justify-between">
                <div className="my-2 px-4">
                    <h2 className="text-black font-semibold text-lg">
                        {product.title}
                    </h2>
                </div>
                <div className="px-4 flex justify-between items-center">
                    <span className="text-gray-700 font-medium flex items-center">
                        {product.price} EGP
                    </span>
                    <div className="flex items-center space-x-2">
                        <FavouritesButton product={product} />
                        <CartButton product={product} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
