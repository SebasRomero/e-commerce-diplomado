
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const PopularProducts = () => {
  const products = [
    {
      id: 1,
      name: 'Backpack',
      category: 'Escolar',
      originalPrice: '$541.00',
      discountedPrice: '$249.00',
      imageUrl: 'https://jormands.com.co/cdn/shop/files/M30GreenBackpack.png?v=1720104233&width=1946',
    },
    {
      id: 2,
      name: 'Hotweels',
      category: 'Juguetes',
      originalPrice: '$350.00',
      discountedPrice: '$250.00',
      imageUrl: 'https://comercialpapelera.com.co/tienda/11198-large_default/hot-wheels-autos-basicos-x-1-und.jpg',
    },
    {
      id: 3,
      name: 'Nike Dunk Low Coast',
      category: 'Ropa',
      originalPrice: '$120.00',
      discountedPrice: '$69.00',
      imageUrl: 'https://i.ebayimg.com/thumbs/images/g/DRgAAOSwwdhkeg-i/s-l1200.jpg',
    },
    {
      id: 4,
      name: 'Iron Man',
      category: 'Juguetes',
      originalPrice: '$350.00',
      discountedPrice: '$250.00',
      imageUrl: 'https://images-cdn.ubuy.co.id/662d0901d4227c029c4db683-marvel-avengers-titan-hero-series.jpg',
    },
    {
      id: 5,
      name: 'Juego de comedor',
      category: 'Hogar',
      originalPrice: '$120.00',
      discountedPrice: '$69.00',
      imageUrl: 'https://m.media-amazon.com/images/I/71d3oFQjq3L._AC_UF894,1000_QL80_.jpg',
    },
    {
      id: 6,
      name: 'Televisor',
      category: 'Electrodomésticos',
      originalPrice: '$350.00',
      discountedPrice: '$250.00',
      imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTksG7Ifvht5ObuzXe1NKNPUZsxr_VITz3HGA&s',
    },
    {
      id: 7,
      name: 'Iphone 17 Ultra Pro Max',
      category: 'Electrodomésticos',
      originalPrice: '$120.00',
      discountedPrice: '$69.00',
      imageUrl: 'https://i.blogs.es/4f2baa/iphone-17-concepto/500_333.jpeg',
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className=" h-screen w-[68%] lg:w-[90%] mx-auto pt-[500px] md:pt-40 lg:pt-10 px-4">
      <h2 className="text-orange-500 text-4xl font-bold text-center mb-8">Popular Products</h2>
      <Slider {...settings}>
        {products.map((product) => (
          <div key={product.id} className="bg-[#f5f5f5] rounded-lg shadow-lg p-6 mx-2">
            <img src={product.imageUrl} alt={product.name} className="w-full h-48 object-cover mb-4 rounded-lg" />
            <h3 className="text-lg font-semibold">{product.name}</h3>
            <p className="text-gray-600">{product.category}</p>
            <div className="flex justify-between items-center mt-4">
              <span className="line-through text-red-500">{product.originalPrice}</span>
              <span className="text-orange-500 font-bold">{product.discountedPrice}</span>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default PopularProducts;
