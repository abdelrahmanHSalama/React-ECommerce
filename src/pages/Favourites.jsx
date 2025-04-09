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
                <p className="text-gray-500">
                    You haven't added any products to Favourites yet!
                </p>
            ) : (
                <div>
                    {favouriteItems.map((item) => (
                        <div
                            key={item.id}
                            className="flex justify-between items-center py-3"
                        >
                            <div className="flex items-center gap-4">
                                <img
                                    src={item.thumbnail}
                                    alt={item.title}
                                    className="w-16 h-16 object-cover rounded"
                                />
                                <div>
                                    <h3 className="font-medium">
                                        {item.title}
                                    </h3>
                                    <p className="text-gray-600">
                                        {item.price} EGP
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() =>
                                        dispatch(removeFromFavourites(item.id))
                                    }
                                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Favourites;
