import React from "react";

const ProductCard = ({ title, price, image, onClick }) => {
  return (
    <div className="hover:scale-105 bg-white rounded-2xl shadow-lg p-4 w-full max-w-xs hover:shadow-xl transition">
      <img
        src={image}
        alt={title}
        className="w-full h-48 object-contain rounded-xl mb-4"
      />
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="text-gray-700 font-bold mb-2">{price} ֏</p>

      <button
        className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800"
        onClick={onClick}
      >
        սեփական դիզայնով
      </button>
    </div>
  );
};

export default ProductCard;
