import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import NotFound from "./NotFound";
import CartButton from "../components/CartButton";

export default function ProductDetails() {
    const { id } = useParams();

    // Find product directly from Redux state
    const product = useSelector((state) =>
        state.products.products.find((product) => product.id == id)
    );

    const status = useSelector((state) => state.products.status);
    const error = useSelector((state) => state.products.error);

    if (status === "loading") {
        return <div>Loading...</div>;
    }

    if (status === "failed") {
        return <div>Error: {error}</div>;
    }

    if (!product) {
        return <NotFound />;
    }

    return (
        <div className="container mx-auto p-4 flex flex-col lg:flex-row items-center lg:items-start gap-6">
            <img
                src={product.image}
                alt={product.title}
                className="w-full sm:w-80 md:w-96 lg:w-1/3 object-cover rounded-lg"
            />

            <div className="text-center lg:text-left">
                <h2 className="text-2xl font-semibold mb-2">{product.title}</h2>
                <p className="text-lg mb-1">{product.description}</p>
                <h3 className="text-lg mb-1">{product.price} EGP</h3>
                <CartButton product={product} />
            </div>
        </div>
    );
}
