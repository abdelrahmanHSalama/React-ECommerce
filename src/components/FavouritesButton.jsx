import { useDispatch, useSelector } from "react-redux";
import {
    addToFavourites,
    removeFromFavourites,
} from "../slices/favouritesSlice";
import { FaRegStar, FaStar } from "react-icons/fa";

const FavouritesButton = ({ product }) => {
    const dispatch = useDispatch();
    const isFavourite = useSelector((state) =>
        state.favourites.favouriteItems.some((item) => item.id === product.id)
    );

    const toggleFavourite = () => {
        if (isFavourite) {
            dispatch(removeFromFavourites(product.id));
        } else {
            dispatch(addToFavourites(product));
        }
    };

    return (
        <button
            onClick={toggleFavourite}
            className="text-blue-600 text-xl hover:text-blue-700 transition"
            aria-label="Toggle Favourite"
        >
            {isFavourite ? <FaStar /> : <FaRegStar />}
        </button>
    );
};

export default FavouritesButton;
