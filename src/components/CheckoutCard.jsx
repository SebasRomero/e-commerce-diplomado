const CheckoutCard = (props) => {
  return (
    <div className="w-[300px] bg-white border-gray-900 shadow mb-12">
      <div className="px-5">
        <img
          className="w-full h-64 object-cover mb-4"
          src={props.image}
          alt={props.name}
        />
        <div>
          <h5 className="font-semibold text-lg">{props.name}</h5>
          <div className="flex items-center justify-between">
            {props.discount ? (  
              <div className="flex items-center"> {/* Contenedor flex para agrupar los precios */}
                <span className="text-xl font-bold text-red-500 line-through mr-1"> {/* Ajustar margen a 1 */}
                  ${props.originalPrice.toFixed(2)} 
                </span>
                <span className="text-xl font-bold text-black">
                  ${props.price.toFixed(2)}
                </span>
              </div>
            ) : (  
              <span className="text-xl font-bold text-black">
                ${props.originalPrice.toFixed(2)}
              </span>
            )}
            <span className="text-xl font-bold text-gray-900 dark:text-black">
              x{props.quantity}
            </span>
          </div>
        </div>
        <div className="mt-4 flex justify-end">
          <button 
            onClick={props.onRemove} 
            className="text-red-500 border border-red-500 px-4 py-2 rounded-md hover:bg-red-500 hover:text-white"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutCard;
