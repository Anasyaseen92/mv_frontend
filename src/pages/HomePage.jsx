import Events from "../components/Events/Events.jsx";
import Header from "../components/Layout/Header";
import BestDeals from "../components/Route/BestDeals/BestDeals.jsx";
import Categories from "../components/Route/Categories/Categories.jsx";
import FeaturedProduct from "../components/Route/FeaturedProduct/FeaturedProduct.jsx";
import Footer from "../components/Route/Footer.jsx";
import Hero from "../components/Route/Hero/Hero.jsx"
import Sponsored from "../components/Route/Sponsored.jsx";

function HomePage() {
  return (
    <div className=" min-h-screen bg-slate-100">
      <Header activeHeading={1}/>
      <Hero/>
     <Categories/>
      <BestDeals/>
      <Events/>
      <FeaturedProduct/>
      <Sponsored/>
      <Footer/>
    </div>
  );
}

export default HomePage;
