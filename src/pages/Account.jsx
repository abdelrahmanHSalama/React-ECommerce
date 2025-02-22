const Account = () => {
    return (
        <main className="flex justify-center p-4">
            <div className="w-1/3 bg-white shadow-md rounded-lg p-6">
                <h1 className="mb-4 text-center text-xl font-semibold">
                    Login
                </h1>

                <form>
                    <div className="mb-4">
                        <label className="block font-medium">Username</label>
                        <div className="flex items-center border border-gray-300 rounded-md px-3 py-2">
                            <span className="mr-2">👤</span>
                            <input
                                type="text"
                                placeholder="Username"
                                className="flex-1 outline-none bg-transparent"
                            />
                        </div>
                    </div>

                    <div className="mb-4">
                        <label className="block font-medium">Password</label>
                        <div className="flex items-center border border-gray-300 rounded-md px-3 py-2">
                            <span className="mr-2">🔑</span>
                            <input
                                type="password"
                                placeholder="Password"
                                className="flex-1 outline-none bg-transparent"
                            />
                        </div>
                    </div>
                </form>
            </div>
        </main>
    );
};

export default Account;
