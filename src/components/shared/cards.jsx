import React from "react";
import { Link } from "react-router-dom";

const CardGrid = ({ cards }) => {
  return (
    <section className="py-10 bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4">
          {cards.map((card, index) => (
            <Link key={index} to={card.to}>
              <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center transition-transform duration-200 hover:scale-105 hover:border hover:border-gray-500">
                <img
                  src={card.image}
                  alt={card.name}
                  className="w-12 h-12 mb-4"
                />
                <h3 className="text-lg font-medium text-gray-800">
                  {card.name}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CardGrid;
