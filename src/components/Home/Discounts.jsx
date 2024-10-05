const Discounts = () => {
  return (
    <div className="flex flex-col items-center h-screen mx-auto">
      <div className="flex flex-col items-center justify-center">
        <span className="text-orange-500 text-4xl md:text-4xl lg:text-6xl font-bold pb-6">
          Amazing discounts
        </span>
        <h2 className="text-4xl text-white">Time limited!</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-center">
        <div className="relative mt-16 ml-8 h-auto flex flex-col items-center bg-[#feeee7] p-5">
          <div className="w-64 h-64 overflow-hidden">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTriarVFvdFWUe9t-hiAS8h7EvjWIjFn_NFw&shttps://link-a-la-imagen-de-laptop.jpg"
              alt="Laptop"
              className="w-64 h-64"
            />
          </div>
          <h2>Laptop</h2>
          <h3>Electrodomestics</h3>
          <span className="line-through">$541.00</span>
          <span className="text-orange-500">$249.00</span>
        </div>
        <div className="relative mt-16 ml-8 h-auto flex flex-col items-center bg-[#feeee7] p-5">
          <div className="w-64 h-64 overflow-hidden">
            <img
              src="https://www.mrporter.com/variants/images/1647597313248156/in/w2000_q60.jpg"
              alt="Polo Ralph Lauren Purple Label"
              className="w-64 h-64 object-cover"
            />
          </div>
          <h2>Polo Ralph Lauren Purple Label</h2>
          <h3>Clothes</h3>
          <span className="line-through">$350.00</span>
          <span className="text-orange-500">$250.00</span>
        </div>
        <div className="relative mt-16 ml-8 h-auto flex flex-col items-center bg-[#feeee7] p-5">
          <div className="w-64 h-64 overflow-hidden">
            <img
              src="https://i.ebayimg.com/images/g/9DIAAOSwT6NmGZL1/s-l1200.png"
              alt="Nike Dunk Low Ben & Jerry"
              className="w-64 h-64 object-cover"
            />
          </div>
          <h2>Nike Dunk Low Ben & Jerry</h2>
          <h3>Shoes</h3>
          <span className="line-through">$120.00</span>
          <span className="text-orange-500">$69.00</span>
        </div>
      </div>
    </div>
  );
};

export default Discounts;
