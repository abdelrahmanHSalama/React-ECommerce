import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <div className="flex flex-1">
            <div className="flex flex-col items-center justify-center flex-1">
                <h1 className="text-4xl mb-2">404: Page Not Found!</h1>
                <Link to="/" className="text-blue-700 text-2xl">
                    Return to Homepage
                </Link>
            </div>
        </div>
    );
};

export default NotFound;
