import React from "react";

const LayoutWrapper = ({ title, description, children }) => {
  return (
    <section className="bg-gray-100 py-5 px-4">
      <h1 className="text-center text-4xl font-bold mt-2">{title}</h1>
      <p className="font-medium text-lg text-gray-700 mt-2 text-center text-wrap">
        {description}
      </p>
      <div className="container mx-auto px-4 flex flex-col items-center justify-center mt-4">
        <div className="w-full h-[360px] px-5 py-4 bg-white border-gray-300 border-2 rounded-[25px] text-center shadow-lg hover:shadow-xl transition duration-300">
          {children}
          <p className="mt-4 text-base text-start font-semibold text-gray-500">
            *Your privacy is protected! No data is transmitted or stored.
          </p>
        </div>
      </div>
    </section>
  );
};

export default LayoutWrapper;