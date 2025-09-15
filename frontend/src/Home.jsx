import React from "react";
import Head from "./Head";
import Foot from "./Foot";
import Core from "./Core";

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Head />
      <main className="flex justify-center bg-orange-300 min-h-[31.65rem] sm:min-h-[30rem]">
        <Core />
      </main>
      <Foot />
    </div>
  );
};

export default Home;
