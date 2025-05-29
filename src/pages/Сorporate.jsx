import tshirtPrinting from "../assets/Shor1.jpg";
import mugPrinting from "../assets/cap.png";
import ecoBagPrinting from "../assets/EcoBag.jpg";
import ContactImage from "../assets/canvas.jpg";
export default function CorporateOrders() {
  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
        Կորպորատիվ Պատվերներ
      </h1>

      <p className="text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto text-center">
        «I Mayka» ընկերությունը զբաղվում է տպագրությամբ շապիկների, ակսեսուարների
        եւ տարբեր տեսակի հագուստների վրա՝ սկսած 2010 թվականից։ Մենք
        համագործակցել ենք հարյուրավոր բիզնեսների, թիմերի եւ միջոցառումների
        կազմակերպիչների հետ՝ ստեղծելով յուրահատուկ եւ ոճային արտադրանք։
      </p>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <img
            src={tshirtPrinting}
            alt="Տպագրություն շապիկի վրա"
            className="w-full h-60 object-cover"
          />
          <div className="p-4">
            <h3 className="text-xl font-semibold mb-2">Շապիկներ Ձեր լոգոյով</h3>
            <p className="text-gray-600 text-sm">
              Անձնական մոտեցում յուրաքանչյուր պատվերի համար։ Տպագրություն բարձր
              որակով:
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <img
            src={mugPrinting}
            alt="Բաժակների տպագրություն"
            className="w-full h-60 object-cover"
          />
          <div className="p-4">
            <h3 className="text-xl font-semibold mb-2">Բաժակներ և նվերներ</h3>
            <p className="text-gray-600 text-sm">
              Հիանալի տարբերակ ընկերությունների կամ միջոցառումների համար։
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <img
            src={ecoBagPrinting}
            alt="Էկո պայուսակներ լոգոյով"
            className="w-full h-60 object-cover"
          />
          <div className="p-4">
            <h3 className="text-xl font-semibold mb-2">Էկո պայուսակներ</h3>
            <p className="text-gray-600 text-sm">
              Տպագրություն էկո պայուսակների վրա՝ որպես շրջակա միջավայրին շահավետ
              նվեր:
            </p>
          </div>
        </div>
      </div>

      <div className="mt-12 text-center">
        <h2 className="text-2xl font-semibold mb-4">
          Պատվիրեք կորպորատիվ արտադրանք հիմա
        </h2>
        <p className="text-center text-lg text-gray-600 mb-4 max-w-4xl mx-auto">
          Սա ընդամենը մեր աշխատանքների փոքր հատվածն է։ Մենք մշտապես ընդլայնում
          ենք մեր հնարավորությունները և պատրաստ ենք իրականացնել ցանկացած չափի և
          բարդության կորպորատիվ պատվեր։ Դուք կարող եք պատվիրել շապիկներ,
          բաժակներ, պայուսակներ, բիզնես նվերներ և այլ տեսակի արտադրանք՝ ձեր
          լոգոյով կամ յուրօրինակ դիզայնով։
        </p>
        <div className="max-w-6xl mx-auto my-12 border-2 bg-white rounded-3xl shadow-lg overflow-hidden flex flex-col md:flex-row">
          <div className="w-full md:w-1/2 p-8">
            <h2 className="text-xl md:text-5xl font-bold mb-2">Հետադարձ կապ</h2>
            <p className="text-sm text-gray-600 mb-6">
              Աստղանիշով (*) նշված դաշտերը պարտադիր են։
            </p>
            <form className="space-y-4">
              <input
                type="text"
                placeholder="Անուն *"
                className="w-full border-b p-2 outline-none"
              />
              <input
                type="text"
                placeholder="Ազգանուն *"
                className="w-full border-b p-2 outline-none"
              />
              <input
                type="text"
                placeholder="Հեռախոսահամար"
                className="w-full border-b p-2 outline-none"
              />
              <input
                type="email"
                placeholder="Էլ․ հասցե *"
                className="w-full border-b p-2 outline-none"
              />
              <input
                type="text"
                placeholder="Քաղաք *"
                className="w-full border-b p-2 outline-none"
              />
              <textarea
                placeholder="Հաղորդագրություն *"
                className="w-full border-b p-2 outline-none resize-none"
                rows="3"
              />
              <button
                type="submit"
                className="bg-black text-white py-2 px-6 rounded-full font-semibold"
              >
                ՈՒՂԱՐԿԵԼ
              </button>
            </form>
          </div>

          <div className="relative w-full md:w-1/2 h-96 md:h-auto">
            <img
              src={ContactImage}
              alt="Contact visual"
              className="object-cover w-full h-full"
            />
            <div className="absolute inset-0 flex flex-col justify-center items-center text-white bg-black bg-opacity-40">
              <h3 className="text-3xl font-bold">I Mayka</h3>
              <p className="text-sm">ՈՐԱԿ ԳՆԻՑ ԱՌԱՎԵԼ</p>
              <button className="mt-4 bg-white text-black px-5 py-2 rounded-full font-semibold">
                Գնի՛ր հիմա
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
