import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const donors = [
  {
    name: "Amit Sharma",
    batch: "Batch of 2020",
    amount: "₹5000",
    img: "https://i.pravatar.cc/150?img=1",
  },
  {
    name: "Priya Verma",
    batch: "Batch of 2019",
    amount: "₹3000",
    img: "https://i.pravatar.cc/150?img=2",
  },
  {
    name: "Rahul Singh",
    batch: "Batch of 2021",
    amount: "₹8000",
    img: "https://i.pravatar.cc/150?img=3",
  },
  {
    name: "Sneha Patel",
    batch: "Batch of 2018",
    amount: "₹10000",
    img: "https://i.pravatar.cc/150?img=4",
  },
];

const DonorSection = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 640,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        {/* Catchy Heading */}
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
           Our Proud Donors
        </h2>
        <p className="text-center text-gray-600 mb-10">
          Every contribution counts – thank you for shaping the future! 
        </p>

        {/* Carousel */}
        <Slider {...settings}>
          {donors.map((donor, idx) => (
            <div key={idx} className="px-3 hover:scale-105 hover:shadow-2xl transition transform duration-300">
              <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center text-center hover:shadow-xl transition">
                <img
                  src={donor.img}
                  alt={donor.name}
                  className="w-24 h-24 rounded-full border-4 border-blue-500 object-cover mb-4"
                />
                <h3 className="text-lg font-semibold text-gray-800">
                  {donor.name}
                </h3>
                <p className="text-sm text-gray-500">{donor.batch}</p>
                <p className="text-xl font-bold text-green-600 mt-2">
                  {donor.amount}
                </p>
                <span className="mt-3 inline-block bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs font-semibold">
                  ⭐ Top Contributor
                </span>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default DonorSection;
