import React from "react";

const Card = ({ icon: Icon, title, description }) => {
  return (
    <div className="card p-4">
      {Icon && (
        <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-lg bg-teal-50 text-teal-700">
          <Icon size={22} strokeWidth={2.2} />
        </div>
      )}
      <h3 className="text-lg font-semibold text-slate-950">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
    </div>
  );
};

export default Card;
