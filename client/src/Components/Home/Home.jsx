// import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Banner from "./Banner";
import HeroSection from "./HeroSection";
import RecentListings from "./RecentListings";
import SpecialOffers from "./SpecialOffers";
import WhyChooseUs from "./WhyChooseUs";

const Home = () => {
  const location = useLocation();

  let isHomePath = location.pathname === "/";

  return (
    <div>
      <header>
        <Header></Header>
      </header>

      <main>
        {isHomePath && (
          <>
            <Banner></Banner>
            <WhyChooseUs></WhyChooseUs>
            <RecentListings></RecentListings>
            <SpecialOffers></SpecialOffers>
            <HeroSection></HeroSection>
          </>
        )}

        <Outlet></Outlet>
      </main>

      <footer>
        <Footer></Footer>
      </footer>
    </div>
  );
};

export default Home;
