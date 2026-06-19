import React, { useState } from "react";
import { Link } from "react-router-dom";

const eventsData = [
  {
    category: "MPL",
    subEvents: [
      {
        name: "Debugging Challenge",
        cards: [
          {
            title: "ML Hackathon",
            prize: "₹ 10,00,000/-",
            image: "https://www.mpgi.edu.in/wp-content/uploads/2023/12/41_home-sports-convert.io_.webp",
            link: "/event/ml-hackathon"
          },
          {
            title: "HackIITK",
            prize: "₹ 30,00,000/-",
            image: "https://www.mpgi.edu.in/wp-content/uploads/2023/12/45_home-student-life-convert.io_.webp",
            link: "/event/hackiitk"
          },
        ],
      },
      {
        name: "Hackathon Finale",
        cards: [
          {
            title: "AI Finance Hackathon",
            prize: "₹ 5,00,000/-",
            image: "https://via.placeholder.com/300x200",
            link: "/event/ai-finance"
          },
        ],
      },
    ],
  },
  {
    category: "Freshers",
    subEvents: [
      {
        name: "Talent Hunt",
        cards: [
          {
            title: "Dance Battle",
            prize: "₹ 50,000/-",
            image: "https://via.placeholder.com/300x200",
            link: "/event/dance-battle"
          },
        ],
      },
    ],
  },
];

export default function EventPage() {
  const [selectedCategory, setSelectedCategory] = useState(eventsData[0]);
  const [selectedSubEvent, setSelectedSubEvent] = useState(eventsData[0].subEvents[0]);

  return (
    <div className=" text-black min-h-screen flex flex-col items-center py-8">
      
      {/* Main Category Row */}
      <div className="w-[60%] border-4 border-solid flex justify-around mb-6">
        {eventsData.map((cat) => (
          <div
            key={cat.category}
            onClick={() => {
              setSelectedCategory(cat);
              setSelectedSubEvent(cat.subEvents[0]);
            }}
            className={`cursor-pointer px-6 py-2 text-lg font-semibold transition-all duration-300 
              ${selectedCategory.category === cat.category ? "bg-cyan-200" : ""}`}
          >
            {cat.category}
          </div>
        ))}
      </div>

      {/* Subcategory Row */}
      <div className="w-[50%] border-4 border-solid flex justify-around mb-10">
        {selectedCategory.subEvents.map((sub) => (
          <div
            key={sub.name}
            onClick={() => setSelectedSubEvent(sub)}
            className={`cursor-pointer px-6 py-2  text-md font-medium transition-all duration-300 
              ${selectedSubEvent.name === sub.name ? "bg-cyan-400" : ""}`}
          >
            {sub.name}
          </div>
        ))}
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl px-6">
        {selectedSubEvent.cards.map((card, index) => (
          <div
            key={index}
            className="bg-gray-900 rounded-xl shadow-lg overflow-hidden hover:scale-105 transition-transform duration-300"
          >
            <img src={card.image} alt={card.title} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="text-lg font-bold">{card.title}</h3>
              <p className="text-cyan-400">{card.prize}</p>
              <Link
                to={card.link}
                className="inline-block mt-3 bg-cyan-500 px-4 py-2 rounded-lg hover:bg-cyan-600 transition-colors"
              >
                EXPLORE
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
