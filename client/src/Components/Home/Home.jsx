// import React from "react";
import { Helmet } from "react-helmet";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Banner from "./Banner";
import HeroSection from "./HeroSection";
import MarqueeComponent from "./MarqueeComponent";
import RecentListings from "./RecentListings";
import SpecialOffers from "./SpecialOffers";
import WhyChooseUs from "./WhyChooseUs";

const Home = () => {
  const location = useLocation();

  let isHomePath = location.pathname === "/";

  return (
    <div className="font-body">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Home - RenTaxi</title>
      </Helmet>
      <header className="sticky top-0 z-50">
        <Header></Header>
      </header>

      <main>
        {isHomePath && (
          <>
            <Banner></Banner>
            <WhyChooseUs></WhyChooseUs>
            <MarqueeComponent></MarqueeComponent>
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
