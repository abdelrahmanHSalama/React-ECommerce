import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
    console.log(product);
    return (
        <div
            key={product.id}
            className="w-full sm:w-[48%] lg:w-[32%] xl:w-[19.5%] bg-white shadow-md rounded-lg overflow-hidden"
        >
            <Link to={`/products/${product.id}`} className="no-underline">
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full aspect-square object-cover"
                />
                <div className="p-4">
                    <h2 className="text-black font-semibold text-lg">
                        {product.title}
                    </h2>
                </div>
            </Link>
            <div className="p-4 flex justify-between items-center">
                <span className="text-gray-700 font-medium">
                    {product.price} EGP
                </span>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                    Add to Cart
                </button>
            </div>
        </div>
    );
};

export default ProductCard;
