import ProductCard from "../components/ProductCard";
import Tshirt from "../assets/test.png";
import Football from "../assets/football.png";
import Body from "../assets/body.png";
import { useNavigate } from "react-router-dom";

const products = [
  {
    title: "Մանկական շապիկ",
    price: "4000 դր",
    image: Tshirt,
    type: "Մանկական շապիկ",
  },
  {
    title: "Համազգեստ",
    price: "9000 դր",
    image: Football,
    type: "Համազգեստ",
  },
  {
    title: "Բոդի",
    price: "3000 դր",
    image: Body,
    type: "բոդի",
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
          Երեխաների հավաքածու
        </h1>
        <p className="text-center text-gray-600 mt-3 text-lg">
          Բարի գալուստ մեր Երեխաների բաժին — ստեղծեք անհատական ու գունեղ
          կերպարներ ձեր երեխայի համար
        </p>
      </div>

      <div className="mt-12">
        <div className="my-12 bg-gradient-to-r from-pink-100 via-white to-blue-100 rounded-xl shadow-md p-6">
          <div className="flex justify-center">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3 gap-8">
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
        <p className="text-gray-600 max-w-l mx-auto leading-relaxed">
          👶 Մեր մանկական հավաքածուն ստեղծվել է սիրով՝ մտածելով ամենափոքրիկների
          մասին։
          {<br />}✨ Բարձր որակի բնական նյութեր՝ նուրբ մաշկի համար
          {<br />}💖 Ճիշտ այն, ինչ պետք է ձեր փոքրիկի ամենօրյա ու տոնական
          կերպարների համար
          {<br />}🌿 Ոճ, հարմարավետություն և խաղային տրամադրություն՝ մեկ տեղում։
        </p>
      </div>
    </div>
  );
}
