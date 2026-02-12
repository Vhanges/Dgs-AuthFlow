const Home = () => {
    const test = true;

    const images = [
        "https://via.assets.so/img.jpg?w=200&h=400&bg=e5e7eb&f=png",
        "https://via.assets.so/img.jpg?w=300&h=500&bg=e5e7eb&f=png",
        "https://via.assets.so/img.jpg?w=150&h=250&bg=e5e7eb&f=png",
        "https://via.assets.so/img.jpg?w=400&h=600&bg=e5e7eb&f=png",
        "https://via.assets.so/img.jpg?w=200&h=400&bg=e5e7eb&f=png",
        "https://via.assets.so/img.jpg?w=300&h=500&bg=e5e7eb&f=png",
        "https://via.assets.so/img.jpg?w=150&h=250&bg=e5e7eb&f=png",
        "https://via.assets.so/img.jpg?w=400&h=600&bg=e5e7eb&f=png",
        "https://via.assets.so/img.jpg?w=200&h=400&bg=e5e7eb&f=png",
        "https://via.assets.so/img.jpg?w=300&h=500&bg=e5e7eb&f=png",
        "https://via.assets.so/img.jpg?w=150&h=250&bg=e5e7eb&f=png",
        "https://via.assets.so/img.jpg?w=400&h=600&bg=e5e7eb&f=png",
    ];

    return (
        <div
            className={`w-full h-[80vh] flex flex-col ${
                test ? "items-start justify-start" : "items-center justify-center"
            } rounded-xl border border-gray-300 shadow-2xl overflow-y-auto`}
        >
            <div className="w-full sticky top-0 z-10 p-5 bg-white border-b border-gray-200">
                <h4 className="text-primary text-2xl font-bold">Gallery</h4>
            </div>
            {test ? (
                <div className="flex flex-wrap gap-4 justify-start p-10">
                    {images.map((src, index) => (
                        <div
                            key={index}
                            className="w-40 h-60 bg-gray-200 rounded-lg overflow-hidden"
                        >
                            <img
                                src={src}
                                alt={`placeholder-${index}`}
                                className="w-full h-full"
                                style={{
                                    objectFit: "contain",
                                }}
                            />
                        </div>
                    ))}
                </div>
            ) : (
                <span className="flex flex-col gap-3 items-center flex-1 justify-center w-full">
                    <h5 className="text-primary font-bold text-6xl">No Photos Yet</h5>
                    <p className="text-primary font-bold text-2xl">
                        Your work will be posted here.
                    </p>
                </span>
            )}  
        </div>
    );
};

export default Home;