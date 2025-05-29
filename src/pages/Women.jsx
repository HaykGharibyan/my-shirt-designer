import ProductCard from "../components/ProductCard";
import Tshirt from "../assets/test.png";
import Hoodie from "../assets/WhiteHoodie.png";
import Cap from "../assets/WhiteCap.png";
import Polo from "../assets/WhitePolo.png";
import Sweatshirt from "../assets/WhiteSweatshirt.png";
import { useNavigate } from "react-router-dom";

const products = [
  {
    title: "Շապիկ",
    price: "5000 դր",
    image: Tshirt,
    type: "Շապիկ",
  },
  {
    title: "Պոլո",
    price: "6000 դր",
    image: Polo,
    type: "Պոլո",
  },
  {
    title: "Հուդի",
    price: "12000 դր",
    image: Hoodie,
    type: "Հուդի",
  },
  {
    title: "Սվիտշոթ",
    price: "8000 դր",
    image: Sweatshirt,
    type: "Սվիտշոթ",
  },

  {
    title: "գլխարկ",
    price: "4500 դր",
    image: Cap,
    type: "գլխարկ",
  },
];

export default function Men() {
  const navigate = useNavigate();

  const handleClick = (product) => {
    navigate("/custom", { state: { product } });
  };
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-gradient-to-r from-pink-100 via-white to-blue-100 rounded-xl shadow-md p-8">
        <h1 className="text-4xl font-extrabold text-center text-gray-900 tracking-wide">
          Կանանց հավաքածու
        </h1>
        <p className="text-center text-gray-600 mt-3 text-lg">
          Բարի գալուստ մեր կանանց բաժին — որտեղ ոճը թելադրում ես դու
        </p>
      </div>

      <div className="mt-12">
        <div className="my-12 bg-gradient-to-r from-pink-100 via-white to-blue-100 rounded-xl shadow-md p-6">
          <div className="flex justify-center">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
              {products.map((item, index) => (
                <ProductCard
                  key={index}
                  title={item.title}
                  price={item.price}
                  image={item.image}
                  onClick={() => handleClick(item)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-16 text-center">
        <p className="text-gray-600 max-w-xl mx-auto">
          🔹 Բարձր որակի նյութեր՝ 100% բամբակ {<br />}🔹 Նորաձեւ ընտրություն՝
          հուդիներ, Շապիկներ, պոլոներ, սվիթշրթներ և ավելին Մենք ստեղծել ենք
          հավաքածու, որը կօգնի ձեզ արտահայտել ձեր անհատականությունը՝ անկախ
          առօրյայից կամ միջավայրից։
        </p>
      </div>
    </div>
  );
}
