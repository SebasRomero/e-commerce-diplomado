const Discounts = () => {
  return (
    <div className="flex flex-col items-center h-screen">
      <div className="flex flex-col items-center justify-center">
        <span className="text-orange-500 text-6xl font-bold pb-6">
          Amazing discounts
        </span>
        <h2 className="text-4xl text-white">Time limited!</h2>
      </div>
      <div className="grid grid-cols-3 items-center">
        <div className="relative mt-16 ml-8 h-auto flex flex-col items-center bg-[#feeee7] p-5">
          img
          <h2>Laptop</h2>
          <h3>Electrodomestics</h3>
          <span className="line-through">$541.00</span>
          <span className="text-orange-500">$249.00</span>
        </div>
        <div className="relative mt-16 ml-8 h-auto flex flex-col items-center bg-[#feeee7] p-5">
          img
          <h2>Polo Ralph Lauren Purple Label</h2>
          <h3>Clothes</h3>
          <span className="line-through">$350.00</span>
          <span className="text-orange-500">$250.00</span>
        </div>
        <div className="relative mt-16 ml-8 h-auto flex flex-col items-center bg-[#feeee7] p-5">
          img
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
