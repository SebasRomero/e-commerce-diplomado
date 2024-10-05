import Discounts from "./Home/Discounts"
import Hero from "./Home/Hero"
import PopularProducts from "./Home/PopularProducts"


const Home = () => {
  return (
    <div className="overflow-hidden">
      <Hero/>
      <Discounts/>
      <PopularProducts/>
    </div>
  )
}

export default Home