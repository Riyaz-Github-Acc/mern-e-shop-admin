/* eslint-disable react/prop-types */
const Button = ({ children, type }) => {
  if (type === "loginBtn") {
    return (
      <button className="bg-cyan-800 hover:bg-cyan-900 focus:outline-none focus:shadow-lg text-lg text-white font-medium font-heading py-[14px] px-[50px] rounded-md disabled:bg-opacity-75 disabled:cursor-not-allowed">
        {children}
      </button>
    );
  } else if (type === "innerBtn") {
    return (
      <button className="w-[100%] lg:w-[50%] bg-cyan-800 hover:bg-cyan-900 whitespace-nowrap focus:outline-none focus:shadow-lg text-lg text-white font-medium font-heading py-[14px] px-[50px] rounded-md disabled:bg-opacity-75 disabled:cursor-not-allowed">
        {children}
      </button>
    );
  } else if (type === "smallFormBtn") {
    return (
      <button className="w-[100%] bg-cyan-800 hover:bg-cyan-900 whitespace-nowrap focus:outline-none focus:shadow-lg text-lg text-white font-medium font-heading py-[14px] px-[50px] rounded-md disabled:bg-opacity-75 disabled:cursor-not-allowed">
        {children}
      </button>
    );
  }
};

export default Button;
