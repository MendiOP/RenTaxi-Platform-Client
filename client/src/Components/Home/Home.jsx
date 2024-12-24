import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";

const Home = () => {
  return (
    <div>
      <header>
        <Header></Header>
      </header>

      <main>
        <Outlet></Outlet>
      </main>

      <footer>
        <Footer></Footer>
      </footer>
    </div>
  );
};

export default Home;
