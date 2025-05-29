// файл: CustomDesign.jsx
import React, { useState, useRef } from "react";
import { useLocation } from "react-router-dom";

import WhiteShirt from "../assets/test.png";
import BlackShirt from "../assets/BlackShirt.png";

import WhiteShirtBack from "../assets/WhiteShirtBack.png";
import BlackShirtBack from "../assets/BlackShirtBack.png";

import WhitePoloBack from "../assets/WhitePoloBack.png";
import BlackPoloBack from "../assets/BlackPoloBack.png";
import WhitePolo from "../assets/WhitePolo.png";
import BlackPolo from "../assets/BlackPolo.png";

import WhiteHoodie from "../assets/WhiteHoodie.png";
import BlackHoodie from "../assets/BlackHoodie.png";
import WhiteHoodieBack from "../assets/WhiteHoodieBack.png";
import BlackHoodieBack from "../assets/BlackHoodieBack.png";

import WhiteSweatshirt from "../assets/WhiteSweatshirt.png";
import BlackSweatshirt from "../assets/BlackSweatshirt.png";
import WhiteSweatshirtBack from "../assets/WhiteSweatshirtBack.png";
import BlackSweatshirtBack from "../assets/BlackSweatshirtBack.png";

import WhiteBody from "../assets/body.png";
import BlackBody from "../assets/EcoBag.jpg";
import WhiteBodyBack from "../assets/MainImg.png";
import BlackBodyBack from "../assets/EcoBag.jpg";

import WhiteCap from "../assets/WhiteCap.png";
import BlackCap from "../assets/BlackCap.png";

import emailjs from "emailjs-com";

const colors = ["white", "black"];
const shirtSizes = ["XS", "S", "M", "L", "XL", "XXL", "3XL"];
const kidsShirtSizes = ["1-2", "3-4", "5-6", "7-8", "9-10", "11-12"];
const bodySizes = ["0-3", "3-6", "6-9", "9-12"];
const sleeveTypes = ["Կարճաթև", "Երկարաթև"];

export default function CustomDesign() {
  const [activeIndex, setActiveIndex] = useState(null);

  const location = useLocation();
  const product = location.state?.product || { type: "tshirt" };
  const [selectedColor, setSelectedColor] = useState("white");
  const [selectedSize, setSelectedSize] = useState(
    product.type === "բոդի" ? "" : "" || product.type === "" ? " " : " "
  );
  const [showTextModal, setShowTextModal] = useState(false);
  const [textInput, setTextInput] = useState("");
  const [textColor, setTextColor] = useState("#000000");

  const [sleeveType, setSleeveType] = useState("");
  const [view, setView] = useState("front");
  const [elementsFront, setElementsFront] = useState([]);
  const [elementsBack, setElementsBack] = useState([]);
  const inputRef = useRef();
  const frontRef = useRef();
  const backRef = useRef();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [errors, setErrors] = useState({
    name: "",
    phone: "",
    email: "",
    notes: "",
  });

  const validate = () => {
    let newErrors = {
      name: "",
      phone: "",
      email: "",
      notes: "",
      selectedSize: "",
      sleeveType: "",
    };
    let isValid = true;

    if (productType === "բոդի" && !sleeveType.trim()) {
      newErrors.sleeveType = "Խնդրում ենք ընտրել թևի տեսակը։";
      isValid = false;
    }

    if (productType !== "գլխարկ" && !selectedSize.trim()) {
      newErrors.selectedSize = "Խնդրում ենք ընտրեք չափսը։";
      isValid = false;
    }

    if (!name.trim()) {
      newErrors.name = "Խնդրում ենք մուտքագրել անունը։";
      isValid = false;
    }

    if (!phone.trim()) {
      newErrors.phone = "Խնդրում ենք մուտքագրել հեռախոսահամարը։";
      isValid = false;
    } else if (!/^[0-9+\-\s()]{9,20}$/.test(phone)) {
      newErrors.phone = "Խնդրում ենք մուտքագրել վավեր հեռախոսահամար։";
      isValid = false;
    }

    if (!email.trim()) {
      newErrors.email = "Խնդրում ենք մուտքագրել էլ․ փոստ։";
      isValid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      newErrors.email = "Խնդրում ենք մուտքագրել վավեր էլ․ փոստ։";
      isValid = false;
    }

    if (!notes.trim()) {
      newErrors.notes = "Խնդրում ենք մուտքագրել մանրամասները։";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = () => {
    if (validate()) {
      const formData = { name, phone, email, notes, selectedSize };
      console.log("📦 Order data:", formData);
      return true;
    }
    return false;
  };
  let sizes;

  switch (product.type) {
    case "բոդի":
      sizes = bodySizes;
      break;
    case "Մանկական շապիկ":
      sizes = kidsShirtSizes;
      break;
    default:
      sizes = shirtSizes;
  }

  const elements = view === "front" ? elementsFront : elementsBack;
  const setElements = view === "front" ? setElementsFront : setElementsBack;

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setElements([
          ...elements,
          {
            type: "image",
            content: reader.result,
            fileName: file.name,
            x: 100,
            y: 100,
            scale: 1,
          },
        ]);
      };
      reader.readAsDataURL(file);
    }

    e.target.value = null;
  };

  const handleDrag = (index, dx, dy) => {
    const updated = [...elements];
    updated[index].x += dx;
    updated[index].y += dy;
    setElements(updated);
  };

  const handleScale = (index, factor) => {
    const updated = [...elements];
    updated[index].scale *= factor;
    setElements(updated);
  };

  const handleDelete = (index) => {
    const updated = [...elements];
    updated.splice(index, 1);
    setElements(updated);

    if (updated.length === 0) {
      setActiveIndex(null);
    } else if (activeIndex === index) {
      setActiveIndex(null);
    } else if (activeIndex > index) {
      setActiveIndex((prev) => prev - 1);
    }
  };

  const startDrag = (e, index) => {
    e.preventDefault();
    let startX = e.clientX;
    let startY = e.clientY;

    const onMouseMove = (moveEvent) => {
      const dx = moveEvent.clientX - startX;
      const dy = moveEvent.clientY - startY;
      handleDrag(index, dx, dy);
      startX = moveEvent.clientX;
      startY = moveEvent.clientY;
    };

    const onMouseUp = () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
  };

  const handleExport = async () => {
    const html2canvas = await import("html2canvas");

    if (!frontRef.current || !backRef.current) {
      alert("❌ Չհաջողվեց ստանալ դիզայնի պատկերը (Front կամ Back չի գտնվել)");
      return;
    }

    try {
      const frontCanvas = await html2canvas.default(frontRef.current, {
        scale: 0.8,
      });
      const backCanvas = await html2canvas.default(backRef.current, {
        scale: 0.8,
      });

      const frontBase64 = frontCanvas.toDataURL("image/jpeg", 0.5);
      const backBase64 = backCanvas.toDataURL("image/jpeg", 0.5);

      const designData = {
        name: name,
        phone: phone,
        email: email,
        notes: notes,
        color: selectedColor,
        size: selectedSize,
        sleeveType: product.type === "բոդի" ? sleeveType : "N/A",
        elements: elements.map((el) => ({
          type: el.type,
          content: el.content,
        })),
      };

      await emailjs.send(
        "service_6t6oraj",
        "template_j9r20tk",
        {
          color: designData.color,
          size: designData.size,
          sleeve_type: designData.sleeveType,
          name: designData.name,
          phone: designData.phone,
          email: designData.email,
          notes: designData.notes,
          elements_json: JSON.stringify(designData.elements, null, 2),
          image_front_base64: frontBase64,
          image_back_base64: backBase64,
        },
        "TvmWdlZFq0Krcwm_I"
      );

      alert("✅ ձեր պատվերը ընդունված է");
    } catch (error) {
      console.error("❌ Սխալ առաքման ժամանակ:", error);
      alert("❌ Չհաջողվեց ուղարկել դիզայնը։");
    }
  };

  const frontImages = {
    "մանկական շապիկ": {
      white: WhiteShirt,
      black: BlackShirt,
    },
    շապիկ: {
      white: WhiteShirt,
      black: BlackShirt,
    },
    պոլո: {
      white: WhitePolo,
      black: BlackPolo,
    },
    հուդի: {
      white: WhiteHoodie,
      black: BlackHoodie,
    },
    սվիտշոթ: {
      white: WhiteSweatshirt,
      black: BlackSweatshirt,
    },
    բոդի: {
      white: WhiteBody,
      black: BlackBody,
    },
    գլխարկ: {
      white: WhiteCap,
      black: BlackCap,
    },
  };

  const backImages = {
    "մանկական շապիկ": {
      white: WhiteShirtBack,
      black: BlackShirtBack,
    },
    շապիկ: {
      white: WhiteShirtBack,
      black: BlackShirtBack,
    },
    պոլո: {
      white: WhitePoloBack,
      black: BlackPoloBack,
    },
    հուդի: {
      white: WhiteHoodieBack,
      black: BlackHoodieBack,
    },
    սվիտշոթ: {
      white: WhiteSweatshirtBack,
      black: BlackSweatshirtBack,
    },
    բոդի: {
      white: WhiteBodyBack,
      black: BlackBodyBack,
    },
    գլխարկ: {
      white: BlackCap,
    },
  };
  const handleChangeColor = (index, newColor) => {
    const updated = [...elements];
    updated[index].color = newColor;
    setElements(updated);
  };
  const hasActive = activeIndex !== null && elements[activeIndex];

  const productType = product.type.toLowerCase();
  const frontImage = frontImages?.[productType]?.[selectedColor] || WhiteShirt;
  const backImage =
    backImages?.[productType]?.[selectedColor] || WhiteShirtBack;

  const renderElements = (elementsList) => (
    <div
      className="absolute"
      style={{
        top: "220px",
        left: "50%",
        transform: "translateX(-50%)",
        width: "220px",
        height: "305px",
        zIndex: 10,
      }}
    >
      {elementsList.map((el, i) => (
        <div
          key={i}
          className="absolute cursor-move"
          style={{
            color: el.color || "#000",
            left: el.x,
            top: el.y,
            transform: `scale(${el.scale})`,
            zIndex: activeIndex === i ? 10000 : 9999,
          }}
          onMouseDown={(e) => startDrag(e, i)}
          onClick={() => setActiveIndex(i)} // Только клик!
        >
          {el.type === "text" ? (
            <p
              className="font-bold text-xl"
              style={{
                color: el.color || "#000",
                pointerEvents: "none", // важно!
                userSelect: "none", // предотвращает выделение
                transform: "translateZ(0)", // форсирует GPU
                WebkitFontSmoothing: "antialiased", // сглаживание
              }}
            >
              {el.content}
            </p>
          ) : (
            <img src={el.content} alt="uploaded" className="max-w-[150px]" />
          )}
        </div>
      ))}
    </div>
  );

  return (
    <div className=" container mx-auto min-h-screen p-4 ">
      <div className="grid grid-cols-1 md:grid-cols-12 ">
        <div className="hidden md:block space-y-6 col-span-3 mr-3">
          <div className="bg-white p-4 rounded-xl shadow-lg w-full max-w-md mx-auto">
            <div className="flex border-b mb-4">
              <button className="text-blue-500 font-semibold border-b-2 border-blue-500 px-4 py-2">
                🧩 Դիզայն
              </button>
              <div className="flex-1 border-b" />
            </div>

            <div className="grid grid-cols-2 gap-3 mb-3">
              <input
                type="file"
                ref={inputRef}
                className="hidden"
                onChange={handleImageUpload}
                accept="image/*"
              />{" "}
              <button
                onClick={() => inputRef.current.click()}
                className="border border-blue-400 text-blue-500 py-2 rounded-md font-medium hover:bg-blue-100 transition"
              >
                + Նկար
              </button>
              <button
                onClick={() => setShowTextModal(true)}
                className="border border-blue-400 text-blue-500 py-2 rounded-md font-medium hover:bg-blue-100 transition"
              >
                + Տեքստ
              </button>
              {showTextModal && (
                <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
                  <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-sm space-y-4">
                    <h2 className="text-xl font-semibold">Ավելացնել տեքստ</h2>

                    <input
                      type="text"
                      value={textInput}
                      onChange={(e) => setTextInput(e.target.value)}
                      placeholder="Մուտքագրեք տեքստ"
                      className="w-full p-2 border rounded"
                    />

                    <div>
                      <label className="block mb-1 font-medium">Գույն</label>
                      <input
                        type="color"
                        value={textColor}
                        onChange={(e) => setTextColor(e.target.value)}
                        className="w-full h-10"
                      />
                    </div>

                    <div className="flex justify-end gap-2">
                      <button
                        className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                        onClick={() => setShowTextModal(false)}
                      >
                        Չեղարկել
                      </button>
                      <button
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                        onClick={() => {
                          if (textInput.trim() !== "") {
                            setElements([
                              ...elements,
                              {
                                type: "text",
                                content: textInput,
                                color: textColor,
                                x: 100,
                                y: 100,
                                scale: 1,
                              },
                            ]);
                            setTextInput("");
                            setTextColor("#000000");
                            setShowTextModal(false);
                          }
                        }}
                      >
                        Ավելացնել
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl shadow-lg w-full max-w-md mx-auto">
            <div className="flex border-b mb-4">
              <h2 className="text-blue-500 font-semibold border-b-2 border-blue-500 px-4 py-2">
                ✍️ Լրացուցիչ տեղեկություն պատվերի համար
              </h2>
              <div className="flex-1 border-b" />
            </div>

            <div className="space-y-4">
              <div>
                <label className="block font-medium text-sm mb-1 text-gray-700">
                  🙍‍♂️ Անուն <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className={`w-full border rounded-lg px-3 py-2 ${
                    errors.name ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="օր․՝ Նարեկ"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                )}
              </div>

              <div>
                <label className="block font-medium text-sm mb-1 text-gray-700">
                  📞 Հեռախոսահամար <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className={`w-full border rounded-lg px-3 py-2 ${
                    errors.phone ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="օր․՝ +374 91 123456"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                )}
              </div>

              <div>
                <label className="block font-medium text-sm mb-1 text-gray-700">
                  📧 Էլ. փոստ <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  className={`w-full border rounded-lg px-3 py-2 ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="օր․՝ example@mail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              <div>
                <label className="block font-medium text-sm mb-1 text-gray-700">
                  📝 Մանրամասներ պատվերի համար{" "}
                  <span className="text-red-500">*</span>
                </label>
                <textarea
                  className={`w-full border rounded-lg px-3 py-2 h-28 resize-none ${
                    errors.notes ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="օր․՝ հատուկ ցանկություն և այլն..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
                {errors.notes && (
                  <p className="text-red-500 text-sm mt-1">{errors.notes}</p>
                )}
              </div>
              <button
                onClick={() => {
                  if (handleSubmit()) {
                    handleExport();
                  }
                }}
                className="w-full mt-4 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
              >
                ✅ Հաստատել պատվերը
              </button>
            </div>
          </div>
        </div>

        <div className=" col-span-6  gap-6">
          {product.type.trim() === "գլխարկ" ? (
            <div className=" absolute z-40">
              <img
                onClick={() => setView("front")}
                className="w-28 ml-5 my-5 z-40 cursor-pointer hover:scale-105 mx-auto border-2 shadow-xl  rounded-lg"
                src={frontImage}
                alt=""
              />
            </div>
          ) : (
            <div className=" absolute z-40">
              <img
                onClick={() => setView("back")}
                className="w-20 md:w-28 ml-2 my-2 md:ml-5 md:my-5  z-40 cursor-pointer hover:scale-105 mx-auto border-2 shadow-xl  rounded-lg"
                src={backImage}
                alt=""
              />
              <img
                onClick={() => setView("front")}
                className="w-20 md:w-28 ml-2 my-2 md:ml-5 md:my-5 z-40 cursor-pointer hover:scale-105 mx-auto border-2 shadow-xl  rounded-lg"
                src={frontImage}
                alt=""
              />
              <input
                type="file"
                ref={inputRef}
                className="hidden"
                onChange={handleImageUpload}
                accept="image/*"
              />{" "}
              <div className="md:hidden fixed bottom-0 left-0 right-0 flex justify-center gap-4 bg-white p-4 z-50">
                <button
                  onClick={() => inputRef.current.click()}
                  className="border border-blue-400 text-blue-500 py-2 px-4 rounded-md font-medium hover:bg-blue-100 transition"
                >
                  + Նկար
                </button>
                <button
                  onClick={() => setShowTextModal(true)}
                  className="border border-blue-400 text-blue-500 py-2 px-4 rounded-md font-medium hover:bg-blue-100 transition"
                >
                  + Տեքստ
                </button>
                {showTextModal && (
                  <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-sm space-y-4">
                      <h2 className="text-xl font-semibold">Ավելացնել տեքստ</h2>

                      <input
                        type="text"
                        value={textInput}
                        onChange={(e) => setTextInput(e.target.value)}
                        placeholder="Մուտքագրեք տեքստ"
                        className="w-full p-2 border rounded"
                      />

                      <div>
                        <label className="block mb-1 font-medium">Գույն</label>
                        <input
                          type="color"
                          value={textColor}
                          onChange={(e) => setTextColor(e.target.value)}
                          className="w-full h-10"
                        />
                      </div>

                      <div className="flex justify-end gap-2">
                        <button
                          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                          onClick={() => setShowTextModal(false)}
                        >
                          Չեղարկել
                        </button>
                        <button
                          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                          onClick={() => {
                            if (textInput.trim() !== "") {
                              setElements([
                                ...elements,
                                {
                                  type: "text",
                                  content: textInput,
                                  color: textColor,
                                  x: 100,
                                  y: 100,
                                  scale: 1,
                                },
                              ]);
                              setTextInput("");
                              setTextColor("#000000");
                              setShowTextModal(false);
                            }
                          }}
                        >
                          Ավելացնել
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
          <div className="relative  ">
            <div
              ref={frontRef}
              style={{
                zIndex: view === "front" ? 1 : 0,
                transition: "0.3s ease",
              }}
              className="absolute w-full mx-auto md:border md:rounded-xl md:shadow-lg bg-white overflow-hidden 
               h-screen sm:h-auto   "
            >
              <img
                src={frontImage}
                alt="product front"
                className="w-full h-full object-contain scale-125 sm:scale-100 transition-transform duration-300"
              />

              {renderElements(elementsFront)}
            </div>

            <div
              ref={backRef}
              style={{
                zIndex: view === "front" ? 0 : 1,
                transition: "0.3s ease",
              }}
              className="absolute w-full mx-auto border rounded-xl shadow-lg bg-white overflow-hidden 
               h-screen sm:h-auto"
            >
              <img
                src={backImage}
                alt="product back"
                className="w-full h-full object-contain scale-125 sm:scale-100 transition-transform duration-300"
              />
              {renderElements(elementsBack)}
            </div>
          </div>
        </div>

        <div className="blck md:hidden space-y-6 col-span-3  ">
          <div>
            {" "}
            <div
              className="  w-full mx-auto md:border md:rounded-xl md:shadow-lg bg-white overflow-hidden 
               h-screen sm:h-auto   "
            >
              <img
                src="{frontImage}"
                alt="product front"
                className="w-full h-full object-contain scale-125 sm:scale-100 transition-transform duration-300"
              />
            </div>
          </div>
          <div className="md:hidden block space-y-6 ml-3 mt-[600px] md:mt-0  col-span-3">
            <div>
              <div className="bg-white p-4 rounded-xl shadow-lg w-full max-w-md mx-auto">
                <div className="flex border-b mb-4">
                  <button className="text-blue-500 font-semibold border-b-2 border-blue-500 px-4 py-2">
                    🎨{" "}
                    {productType.charAt(0).toUpperCase() + productType.slice(1)}
                    ի գույնը
                  </button>
                  <div className="flex-1 border-b" />
                </div>
                {product.type === "բոդի" ? (
                  <div className="flex items-center gap-2">
                    {colors.map(
                      (color, index) =>
                        index === 0 && (
                          <button
                            key={color}
                            className={`w-8 h-8 rounded-full border-2 ${
                              selectedColor === color
                                ? "border-black"
                                : "border-gray-300"
                            }`}
                            style={{ backgroundColor: color }}
                            onClick={() => setSelectedColor(color)}
                          />
                        )
                    )}
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    {colors.map((color) => (
                      <button
                        key={color}
                        className={`w-8 h-8 rounded-full border-2 ${
                          selectedColor === color
                            ? "border-black"
                            : "border-gray-300"
                        }`}
                        style={{ backgroundColor: color }}
                        onClick={() => setSelectedColor(color)}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className="space-y-6">
              <div className="bg-white p-4 rounded-xl shadow-lg w-full max-w-md mx-auto">
                <div className="flex border-b mb-4">
                  <button
                    className={`text-blue-500 font-semibold border-b-2 border-blue-500 px-4 py-2 ${
                      errors.selectedSize ? "border-red-500" : "border-blue-500"
                    }`}
                    value={selectedSize}
                  >
                    👕{" "}
                    {productType.charAt(0).toUpperCase() + productType.slice(1)}
                    ի չափսը
                  </button>{" "}
                  {errors.selectedSize && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.selectedSize}
                    </p>
                  )}
                  <div className="flex-1 border-b" />
                </div>
                {product.type.trim() === "գլխարկ" ? null : (
                  <div className="grid grid-cols-3 gap-2">
                    {sizes.map((size) => (
                      <button
                        key={size}
                        className={
                          selectedSize === size
                            ? "border border-blue-400 text-blue-500 py-2 bg-blue-100 rounded-md font-medium hover:bg-blue-50 transition"
                            : "border border-blue-400 text-blue-500 py-2 rounded-md font-medium hover:bg-blue-50 transition"
                        }
                        onClick={() => setSelectedSize(size)}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              {product.type === "բոդի" && (
                <div>
                  <div className="bg-white p-4 rounded-xl shadow-lg w-full max-w-md mx-auto">
                    <div className="flex border-b mb-4">
                      <button
                        className={`text-blue-500 font-semibold border-b-2 border-blue-500 px-4 py-2 ${
                          errors.sleeveType
                            ? "border-red-500"
                            : "border-blue-500"
                        }`}
                        value={sleeveType}
                      >
                        👕
                        {productType.charAt(0).toUpperCase() +
                          productType.slice(1)}
                        ի չափսը
                      </button>
                      {errors.sleeveType && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.sleeveType}
                        </p>
                      )}
                      <div className="flex-1 border-b" />
                    </div>

                    <div className="flex gap-2">
                      {sleeveTypes.map((type) => (
                        <button
                          key={type}
                          className={
                            sleeveType === type
                              ? " border border-blue-400 text-blue-500 py-2 bg-blue-100 rounded-md font-medium hover:bg-blue-50 transition"
                              : "border border-blue-400 text-blue-500 py-2 rounded-md font-medium hover:bg-blue-50 transition"
                          }
                          onClick={() => setSleeveType(type)}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className=" bg-white p-4 rounded-xl shadow-lg w-full max-w-md mx-auto">
            <div className="flex border-b mb-4">
              <h2 className="text-blue-500 font-semibold border-b-2 border-blue-500 px-4 py-2">
                ✍️ Լրացուցիչ տեղեկություն պատվերի համար
              </h2>
              <div className="flex-1 border-b" />
            </div>

            <div className="space-y-4">
              <div>
                <label className="block font-medium text-sm mb-1 text-gray-700">
                  🙍‍♂️ Անուն <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className={`w-full border rounded-lg px-3 py-2 ${
                    errors.name ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="օր․՝ Նարեկ"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                )}
              </div>

              <div>
                <label className="block font-medium text-sm mb-1 text-gray-700">
                  📞 Հեռախոսահամար <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className={`w-full border rounded-lg px-3 py-2 ${
                    errors.phone ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="օր․՝ +374 91 123456"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                )}
              </div>

              <div>
                <label className="block font-medium text-sm mb-1 text-gray-700">
                  📧 Էլ. փոստ <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  className={`w-full border rounded-lg px-3 py-2 ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="օր․՝ example@mail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              <div>
                <label className="block font-medium text-sm mb-1 text-gray-700">
                  📝 Մանրամասներ պատվերի համար{" "}
                  <span className="text-red-500">*</span>
                </label>
                <textarea
                  className={`w-full border rounded-lg px-3 py-2 h-28 resize-none ${
                    errors.notes ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="օր․՝ հատուկ ցանկություն և այլն..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
                {errors.notes && (
                  <p className="text-red-500 text-sm mt-1">{errors.notes}</p>
                )}
              </div>
              <button
                onClick={() => {
                  if (handleSubmit()) {
                    handleExport();
                  }
                }}
                className="w-full mt-4 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
              >
                ✅ Հաստատել պատվերը
              </button>
            </div>
          </div>
        </div>
        <div className="hidden md:block space-y-6 ml-3 mt-[600px] md:mt-0  col-span-3">
          <div className="bg-white p-4 rounded-xl shadow-lg w-full max-w-md mx-auto">
            <div className="flex border-b mb-4">
              <h2 className=" container text-blue-500 font-semibold border-b-2 text-3xl border-blue-500 px-4 py-2 flex justify-center">
                {productType.charAt(0).toUpperCase() + productType.slice(1)}
              </h2>

              <div className="flex-1 border-b" />
            </div>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-lg w-full max-w-md mx-auto">
            <div className="flex border-b mb-4">
              <button className="text-blue-500 font-semibold border-b-2 border-blue-500 px-4 py-2">
                🎯 Կառավարել տարրը
              </button>
              <div className="flex-1 border-b" />
            </div>

            <div className="p-4  space-y-4 bg-white ">
              <div className="grid grid-cols-3 gap-3">
                <button
                  onClick={() => handleScale(activeIndex, 1.1)}
                  disabled={!hasActive}
                  title="Մեծացնել"
                  className={`flex flex-col items-center justify-center p-2 py-2 rounded-md font-medium transition
        ${
          !hasActive
            ? "bg-gray-100 text-gray-400 cursor-not-allowed border"
            : "bg-white hover:bg-blue-50 text-blue-500 border border-blue-400 shadow-sm"
        }`}
                >
                  <span className="text-3xl">+</span>
                  <span className="text-xs mt-1">Մեծացնել</span>
                </button>

                <button
                  onClick={() => handleScale(activeIndex, 0.9)}
                  disabled={!hasActive}
                  title="Փոքրացնել"
                  className={`flex flex-col items-center justify-center p-2 py-2 rounded-md font-medium transition
        ${
          !hasActive
            ? "bg-gray-100 text-gray-400 cursor-not-allowed border"
            : "bg-white hover:bg-blue-50 text-blue-500 border border-blue-400 shadow-sm"
        }`}
                >
                  <span className="text-3xl">−</span>
                  <span className="text-xs mt-1">Փոքրացնել</span>
                </button>

                <button
                  onClick={() => handleDelete(activeIndex)}
                  disabled={!hasActive}
                  title="Ջնջել"
                  className={`flex flex-col items-center justify-center p-2 py-2 rounded-md font-medium transition
        ${
          !hasActive
            ? "bg-gray-100 text-gray-400 cursor-not-allowed border"
            : "bg-red-100 hover:bg-red-200 text-red-700 shadow-sm"
        }`}
                >
                  <span className="text-xl">✕</span>
                  <span className="text-xs mt-1">Ջնջել</span>
                </button>
              </div>

              <div className="flex items-center gap-3">
                <label className="text-sm font-medium text-gray-700 whitespace-nowrap">
                  🎨 Տեքստի գույնը
                </label>
                <input
                  type="color"
                  value={hasActive?.color || "#000000"}
                  onChange={(e) =>
                    hasActive?.type === "text" &&
                    handleChangeColor(activeIndex, e.target.value)
                  }
                  disabled={!hasActive || hasActive?.type !== "text"}
                  className={`w-20 h-10 rounded-full border transition ${
                    !hasActive || hasActive?.type !== "text"
                      ? "opacity-50 cursor-not-allowed"
                      : "cursor-pointer border-gray-400"
                  }`}
                />
              </div>
            </div>
          </div>

          <div>
            <div className="bg-white p-4 rounded-xl shadow-lg w-full max-w-md mx-auto">
              <div className="flex border-b mb-4">
                <button className="text-blue-500 font-semibold border-b-2 border-blue-500 px-4 py-2">
                  🎨{" "}
                  {productType.charAt(0).toUpperCase() + productType.slice(1)}ի
                  գույնը
                </button>
                <div className="flex-1 border-b" />
              </div>
              {product.type === "բոդի" ? (
                <div className="flex items-center gap-2">
                  {colors.map(
                    (color, index) =>
                      index === 0 && (
                        <button
                          key={color}
                          className={`w-8 h-8 rounded-full border-2 ${
                            selectedColor === color
                              ? "border-black"
                              : "border-gray-300"
                          }`}
                          style={{ backgroundColor: color }}
                          onClick={() => setSelectedColor(color)}
                        />
                      )
                  )}
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  {colors.map((color) => (
                    <button
                      key={color}
                      className={`w-8 h-8 rounded-full border-2 ${
                        selectedColor === color
                          ? "border-black"
                          : "border-gray-300"
                      }`}
                      style={{ backgroundColor: color }}
                      onClick={() => setSelectedColor(color)}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="space-y-6">
            <div className="bg-white p-4 rounded-xl shadow-lg w-full max-w-md mx-auto">
              <div className="flex border-b mb-4">
                <button
                  className={`text-blue-500 font-semibold border-b-2 border-blue-500 px-4 py-2 ${
                    errors.selectedSize ? "border-red-500" : "border-blue-500"
                  }`}
                  value={selectedSize}
                >
                  👕{productType.charAt(0).toUpperCase() + productType.slice(1)}
                  ի չափսը
                </button>{" "}
                {errors.selectedSize && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.selectedSize}
                  </p>
                )}
                <div className="flex-1 border-b" />
              </div>
              {product.type.trim() === "գլխարկ" ? null : (
                <div className="grid grid-cols-3 gap-2">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      className={
                        selectedSize === size
                          ? "border border-blue-400 text-blue-500 py-2 bg-blue-100 rounded-md font-medium hover:bg-blue-50 transition"
                          : "border border-blue-400 text-blue-500 py-2 rounded-md font-medium hover:bg-blue-50 transition"
                      }
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              )}
            </div>
            {product.type === "բոդի" && (
              <div>
                <div className="bg-white p-4 rounded-xl shadow-lg w-full max-w-md mx-auto">
                  <div className="flex border-b mb-4">
                    <button
                      className={`text-blue-500 font-semibold border-b-2 border-blue-500   py-2 ${
                        errors.sleeveType ? "border-red-500" : "border-blue-500"
                      }`}
                      value={sleeveType}
                    >
                      👕
                      {productType.charAt(0).toUpperCase() +
                        productType.slice(1)}
                      ի չափսը
                    </button>
                    {errors.sleeveType && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.sleeveType}
                      </p>
                    )}
                    <div className="flex-1 border-b" />
                  </div>

                  <div className="flex gap-2">
                    {sleeveTypes.map((type) => (
                      <button
                        key={type}
                        className={
                          sleeveType === type
                            ? " border border-blue-400 text-blue-500 py-2 bg-blue-100 rounded-md font-medium hover:bg-blue-50 transition"
                            : "border border-blue-400 text-blue-500 py-2 rounded-md font-medium hover:bg-blue-50 transition"
                        }
                        onClick={() => setSleeveType(type)}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}{" "}
            <div>
              <div className="bg-white p-4 rounded-xl shadow-lg w-full max-w-md mx-auto">
                <div className="flex border-b mb-4">
                  <button className="text-blue-500 font-semibold border-b-2 border-blue-500 px-4 py-2">
                    Ներբեռնված ֆայլեր ({view === "front" ? "Առջև" : "Մեջք"}):
                  </button>
                  <div className="flex-1 border-b" />
                </div>
                <ul className="text-sm">
                  {elements
                    .filter((e) => e.type === "image")
                    .map((e, i) => (
                      <li key={i}>📁 {e.fileName || "Նկար"}</li>
                    ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
