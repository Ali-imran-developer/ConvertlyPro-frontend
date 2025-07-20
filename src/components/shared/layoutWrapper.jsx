import React from "react";

const LayoutWrapper = ({ title, description, children }) => {
  return (
    <section className="max-w-full w-full bg-gray-100 px-4 py-8">
      <h1 className="text-center text-4xl font-bold">{title}</h1>
      <p className="font-medium text-lg text-gray-700 text-center text-wrap">
        {description}
      </p>
      <div className=" px-4 flex flex-col items-center justify-center mt-4">
        <div className="max-w-7xl space-y-4 w-full bg-white rounded-xl text-center shadow-lg hover:shadow-xl transition duration-300">
          {children}
          <p className="ps-4 pb-4 text-base text-start font-semibold text-gray-500">
            *Your privacy is protected! No data is transmitted or stored.
          </p>
        </div>
      </div>
    </section>
  );
};

export default LayoutWrapper;