import React from "react";
import Wrapper from "../../components/wrapper/imageToText";
import { paragraphs, questionsPara, cardsDetails, ourDetails, applications, faqData, } from "../../data/data";
import CardGrid from '../../components/shared/cards';
import { cards } from "@/data/cardsData/cardsData";
import {blogs} from '@/data/blogsData/blogsData';
import BlogsCards from '@/components/shared/blogs';
import ImageToText from "@/components/wrapper/testFile";

const Home = () => {
  return (
    <>
      <Wrapper/>
      {/* <ImageToText/> */}

      <CardGrid cards={cards} />

      <section className="py-5 bg-gray-100">
        <div className="container mx-auto px-4 flex items-center">
          <div className="w-[75%]">
            {paragraphs.map((item, index) => {
              return (
                <p
                  key={index}
                  className="text-lg text-wrap font-medium leading-loose"
                >
                  {item.para}
                </p>
              );
            })}
          </div>
          <div className="w-[25%]">
            <img
              src={`https://www.imagetotext.info/web_assets/frontend/img/guide-right.svg`}
              alt=""
              className="max-w-full h-auto object-cover"
            />
          </div>
        </div>
      </section>

      <section className="py-5">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center">
            <img
              src={`https://www.imagetotext.info/web_assets/frontend/img/ocr_document.webp`}
              alt=""
              className="max-w-full h-auto object-cover"
            />
          </div>
          <div className="">
            {questionsPara.map((item, index) => {
              return (
                <div className="" key={index}>
                  <p className="text-lg leading-relaxed mb-2 font-medium">
                    {item.para}
                  </p>
                  <h1 className="text-3xl font-semibold">{item.heading}</h1>
                  <p className="text-lg leading-relaxed mb-2 font-medium">
                    {item.para2}
                  </p>
                  <ul>
                    <li className="italic">{item.li}</li>
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-10 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="text-center mt-4 mb-8">
            <h1 className="text-3xl font-bold">
              Features - Image to Text Converter
            </h1>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4">
            {cardsDetails.map((item, index) => (
              <div
                key={index}
                className="border-[2px] border-blue-500 text-center rounded-lg p-6 bg-white shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <h4 className="text-xl font-semibold mb-4">{item.name}</h4>
                <p className="text-gray-600 text-base">{item.para}</p>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-center py-10">
            <img
              src={`https://www.imagetotext.info/web_assets/frontend/img/word_detection.webp`}
              alt=""
              className="max-w-full h-auto object-cover"
            />
          </div>
          <div className="text-center py-4">
            <h1 className="text-3xl font-bold">
              Where can you use a photo to text converter?
            </h1>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 py-4">
            {ourDetails.map((item, index) => (
              <div
                key={index}
                className="border-[2px] border-blue-500 text-center rounded-lg p-6 bg-white shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <h4 className="text-xl font-semibold mb-4">{item.name}</h4>
                <p className="text-gray-600 text-base">{item.para}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-10 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center pb-4">
            <h1 className="text-3xl font-bold">
              Frequently Asked Questions (FAQs)
            </h1>
          </div>
          <div>
            {faqData.map((item, index) => (
              <div
                key={index}
                className="mb-6 p-6 bg-white shadow-[0_15px_50px_rgba(0,0,0,0.05)] rounded-lg"
              >
                <h2 className="text-xl font-semibold text-dark-blue-700">
                  {item.question}
                </h2>
                <p className="text-lg font-semibold leading-relaxed text-gray-800 mt-2">
                  {item.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <BlogsCards blogs={blogs}/>

      <section className="py-10 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">Applications</h2>
          <p className="text-center text-gray-800 mb-8">
            You can download image to text apps
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4">
            {applications.map((app, index) => (
              <div
                key={index}
                className="border rounded-lg bg-white shadow-md px-6 py-4 flex flex-col items-center text-center hover:shadow-lg transition-shadow duration-300"
              >
                <h3 className="text-lg font-bold mb-1">{app.title}</h3>
                <p className="text-base text-gray-600 font-medium mb-2">
                  {app.subtitle}
                </p>
                <img
                  src={app.image}
                  alt={app.title}
                  className="max-w-full h-auto mb-4 object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
