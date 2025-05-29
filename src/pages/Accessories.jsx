import ProductCard from "../components/ProductCard";
import Pen from "../assets/EcoBag.jpg";
import Notebook from "../assets/EcoBag.jpg";
import Bottle from "../assets/EcoBag.jpg";
import Thermos from "../assets/EcoBag.jpg";
import Mug from "../assets/EcoBag.jpg";
import Glass from "../assets/EcoBag.jpg";
import Lighter from "../assets/EcoBag.jpg";
import Wallet from "../assets/EcoBag.jpg";
import Canvas from "../assets/EcoBag.jpg";
import Ball from "../assets/EcoBag.jpg";
import Pillow from "../assets/EcoBag.jpg";

const products = [
  { title: "գրիչ", price: "1000 դր.", image: Pen },
  { title: "Նոթատետր", price: "3000 դր.", image: Notebook },
  { title: "Ջրի շիշ", price: "4000 դր.", image: Bottle },
  { title: "Թերմոս", price: "7000 դր.", image: Thermos },
  { title: "Բաժակ", price: "2500 դր.", image: Mug },
  { title: "Բակալ", price: "3500 դր.", image: Glass },
  { title: "Կրակայրիչ", price: "1500 դր.", image: Lighter },
  { title: "Դրամապանակ", price: "5000 դր.", image: Wallet },
  { title: "Կանվաս (լուսանկար)", price: "8000 դր.", image: Canvas },
  { title: "Ֆուտբոլի գնդակ", price: "6000 դր.", image: Ball },
  { title: "Բարձ", price: "5500 դր.", image: Pillow },
];

export default function AccessoriesAndGifts() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-gradient-to-r from-pink-100 via-white to-blue-100 rounded-xl shadow-md p-8">
        <h1 className="text-4xl font-extrabold text-center text-gray-900 tracking-wide">
          Աքսեսուարներ և Նվերներ
        </h1>
        <p className="text-center text-gray-600 mt-3 text-lg max-w-2xl mx-auto">
          Փնտրու՞մ ես ինչ-որ յուրահատուկ բան՝ ուրախացնելու ընկերոջդ, սիրլիիդ կամ
          ինքդ քեզ։ Այստեղ կգտնես օրիգինալ աքսեսուարներ ու հաճելի նվերներ՝ ամեն
          ճաշակի համար 🎁
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
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-16 text-center">
        <p className="text-gray-600 max-w-xl mx-auto">
          ✨ Յուրաքանչյուր ապրանք կարելի է պատրաստել անհատական դիզայնով՝
          անունով, նկարով կամ շնորհավորական գրությամբ։ Ունենք նաև փաթեթավորման
          տարբերակներ։
        </p>
      </div>
    </div>
  );
}
