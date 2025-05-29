import MainImg from "../assets/MainImg.png";
import ProductCard from "../components/ProductCard";
import Shor from "../assets/Shor1.jpg";
import EcoBag from "../assets/EcoBag.jpg";
import Canvas from "../assets/canvas.jpg";
import Ball from "../assets/ball.png";
import Football from "../assets/football.png";

const products = [
  {
    title: "Շապիկ Ա4 պրինտով",
    price: "6000 դր",
    image: Shor,
  },
  {
    title: "Գնդակ",
    price: "5000 դր",
    image: Ball,
  },
  {
    title: "Կտավ",
    price: "7000 դր",
    image: Canvas,
  },
  {
    title: "Համազգեստ",
    price: "5900 դր",
    image: Football,
  },
];

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div>
        <img
          src={MainImg}
          className="w-full h-60 object-cover rounded-xl"
          alt="Գլխավոր պատկեր"
        />
      </div>

      <div className="my-12 bg-gradient-to-r from-pink-100 via-white to-blue-100 rounded-xl shadow-md p-6">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-extrabold text-gray-800 tracking-tight">
            ⭐️ Best Sellers
          </h2>
          <p className="text-lg text-gray-600 mt-2">
            Մեր հաճախորդների ամենասիրելի ապրանքները
          </p>
        </div>

        <div className="flex justify-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8">
            {products.map((item, index) => (
              <ProductCard
                key={index}
                title={item.title}
                price={item.price}
                image={item.image}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
