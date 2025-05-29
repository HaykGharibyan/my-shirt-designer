import { Routes, Route } from "react-router-dom";
import Header from "./components/header";
import Home from "./pages/Home";
import Catalog from "./pages/Catalog";
import CustomDesign from "./pages/CustomDesign";
import Footer from "./components/Footer";
import Men from "./pages/Men";
import Women from "./pages/Women";
import Kids from "./pages/Kids";
import Accessories from "./pages/Accessories";
import Сorporate from "./pages/Сorporate";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/custom" element={<CustomDesign />} />

        <Route path="/men" element={<Men />} />
        <Route path="/women" element={<Women />} />
        <Route path="/kids" element={<Kids />} />
        <Route path="/accessories" element={<Accessories />} />
        <Route path="/corporate" element={<Сorporate />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
