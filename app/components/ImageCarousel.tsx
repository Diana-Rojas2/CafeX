import { useState } from "react";

interface ImageCarouselProps {
  product: string[];
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({ product }) => {
  const [selectedImage, setSelectedImage] = useState(0); // To track the selected image index

  const handleImageChange = (index: number) => {
    setSelectedImage(index);
  };

  return (
    <div className="md:flex-1 px-4">
      <div className="relative">
        <div className="h-64 md:h-80 rounded-lg bg-gray-100 mb-4 overflow-hidden flex items-center justify-center relative">
          {product.map((imageUrl, index) => (
            <div
              key={index}
              className={`absolute top-0 left-0 w-full h-full transition-opacity duration-300 ${
                index === selectedImage ? "opacity-100" : "opacity-0"
              }`}
            >
              <img
                src={imageUrl}
                alt={`Image ${index}`}
                className="object-contain max-h-full max-w-full mx-auto"
              />
            </div>
          ))}
        </div>

        <div className="flex -mx-1 mb-4 justify-center">
          {product.map((imageUrl, index) => (
            <div key={index} className="px-1">
              <button
                onClick={() => handleImageChange(index)}
                className={`focus:outline-none w-16 h-16 bg-gray-100 flex items-center justify-center rounded-sm border border-gray-300 ${
                  index === selectedImage ? "ring-2 ring-indigo-300 ring-inset" : ""
                }`}
              >
                <img
                  src={imageUrl}
                  alt={`Thumbnail ${index}`}
                  className="object-contain h-full w-full"
                />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageCarousel;
