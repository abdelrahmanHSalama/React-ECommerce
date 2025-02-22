const Contact = () => {
    return (
        <main className="flex justify-center p-4">
            <div className="w-1/3 bg-white shadow-md rounded-lg p-6">
                <h1 className="mb-4 text-center text-xl font-semibold">
                    Contact Us
                </h1>

                <form>
                    <div className="mb-4">
                        <label className="block font-medium">Name</label>
                        <input
                            type="text"
                            placeholder="Name"
                            className="w-full border border-gray-300 rounded-md p-2"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block font-medium">Email</label>
                        <input
                            type="email"
                            placeholder="name@example.com"
                            className="w-full border border-gray-300 rounded-md p-2"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block font-medium">Inquiry</label>
                        <textarea
                            rows={3}
                            className="w-full border border-gray-300 rounded-md p-2"
                        />
                    </div>
                </form>
            </div>
        </main>
    );
};

export default Contact;
