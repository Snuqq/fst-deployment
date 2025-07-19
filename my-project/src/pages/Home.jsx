import React from "react";
import Hero from "../component/Hero";
import ProductList from "../component/ProductList";
import Profile from "./Profile";

const Home = () => {
  return (
    <div className="pb-24">

      <Hero />
      <ProductList />
    </div>
  );
};

export default Home;
