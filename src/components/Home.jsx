import Discounts from "./Home/Discounts"
import Footer from "./Home/Footer"
import Hero from "./Home/Hero"
import PopularProducts from "./Home/PopularProducts"


const Home = () => {
  return (
    <div className="overflow-hidden">
      <Hero/>
      <Discounts/>
      <PopularProducts/>
      <Footer/>
    </div>
  )
}

export default Home