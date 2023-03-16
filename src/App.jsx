import React from "react";
import Header from "./layouts/Header/Header";
import { Route, Routes } from "react-router-dom";
import ProductListing from "./Pages/ProductListing/ProductListing";
import Home from "./Pages/Home/Home";
import Product from "./Pages/Product/Product";
import Footer from "./layouts/Footer/Footer";
function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products/:id" element={<ProductListing />} />
        <Route path="/products/:id/:singleproduct" element={<Product />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
