import React from "react";
import Sidebar from "../../components/SIdebar/Sidebar";
import MessageContainer from "../../components/Messages/MessageContainer";

const Home = () => {
  return (
    <div
      className="flex flex-col sm:flex-row
 overflow-scroll   sm:h-[450px] md:h-[550px] rounded-lg  bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0"
    >
      <Sidebar />
      <MessageContainer />
    </div>
  );
};

export default Home;
