
const CheckoutCard = (props) => {
  return (
    <div className="w-[300px] bg-white border-gray-900 shadow mb-12">
      <div className="px-5  ">
      <img
            className="w-full h-64 object-cover mb-4"
            src={props.image} 
            alt={props.name}
          />

        <div>
          <h5>{props.name}</h5>
          <div className="flex justify-between">
            <span className="text-xl font-bold text-gray-900 dark:text-black">
              ${props.price}
            </span>
            <span className="text-xl font-bold text-gray-900 dark:text-black">
              x{props.quantity}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutCard;
