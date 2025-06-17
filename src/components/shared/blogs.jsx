import React from "react";
import { Link } from "react-router-dom";

const blogsCards = ({blogs}) => {
  return (
    <section className="py-10 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-6">Related Blogs</h2>
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4">
          {blogs.map((blog, index) => (
            <div
              key={index}
              className="border rounded-lg bg-white shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <Link to={"/"}>
                <img
                  src={blog.image}
                  alt={blog.heading}
                  className="w-full h-auto object-cover rounded-t-lg"
                />
              </Link>
              <div className="p-4">
                <Link to={"/"}>
                  <h3 className="text-lg font-bold mb-2">{blog.heading}</h3>
                </Link>
                <p className="text-gray-800 font-medium text-base">
                  {blog.date}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default blogsCards;