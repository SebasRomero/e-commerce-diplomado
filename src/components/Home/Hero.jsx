const Hero = () => {
  return (
    <div className="w-full min-h-[75vh] h-screen grid grid-cols-1 md:grid-cols-2 gap-5 items-center px-4 md:px-16 lg:px-[20%]">
      <div>
        <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-orange-500">Welcome to Luro</h1>
        <h2 className="text-3xl text-white mt-6">
          Low prices, discounts and more!
        </h2>
      </div>
      <div>
        <img
          className="w-full"
          src={"https://www.svgrepo.com/show/250771/ecommerce.svg"}
          alt="hero"
        />
      </div>
    </div>
  );
};


export default Hero;
