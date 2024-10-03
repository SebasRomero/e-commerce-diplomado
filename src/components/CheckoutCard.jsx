/* eslint-disable react/prop-types */
const CheckoutCard = (props) => {
  return (
    <div className="w-[300px] bg-white border-gray-900 shadow mb-12">
      <div className="px-5  ">
        <div>image</div>

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
