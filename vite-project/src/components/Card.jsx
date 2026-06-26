import React from "react";

const Card = ({ title, description }) => {
  return (
 <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-2 transition duration-300">
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default Card;