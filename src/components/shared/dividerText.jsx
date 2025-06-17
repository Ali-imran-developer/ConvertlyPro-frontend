const DividerWithText = ({ text }) => {
  return (
    <div className="relative flex items-center">
      <div className="flex-grow border-t border-gray-300"></div>
      <span className="mx-2 text-gray-500 bg-white px-2">{text}</span>
      <div className="flex-grow border-t border-gray-300"></div>
    </div>
  );
};

export default DividerWithText;