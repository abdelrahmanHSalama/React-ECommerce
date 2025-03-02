import { useSelector, useDispatch } from "react-redux";
import { removeFromFavourites } from "../slices/favouritesSlice";
import { Link } from "react-router-dom";

const Favourites = () => {
    const dispatch = useDispatch();
    const { favouriteItems } = useSelector((state) => state.favourites);

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-semibold mb-4">⭐ Favourites</h2>

            {favouriteItems.length === 0 ? (
                <div className="text-center text-gray-500">
                    <p>You haven't added any products to Favourites yet!</p>
                    <Link to="/products" className="text-blue-500 underline">
                        Browse Products
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {favouriteItems.map((item) => (
                        <div
                            key={item.id}
                            className="border rounded-lg p-4 shadow-sm flex flex-col items-center"
                        >
                            <img
                                src={item.image}
                                alt={item.title}
                                className="w-24 h-24 object-cover rounded"
                            />
                            <div className="text-center mt-2">
                                <h3 className="font-medium">{item.title}</h3>
                                <p className="text-gray-600">
                                    {item.price} EGP
                                </p>
                            </div>

                            <button
                                onClick={() =>
                                    dispatch(removeFromFavourites(item.id))
                                }
                                className="mt-2 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Favourites;
