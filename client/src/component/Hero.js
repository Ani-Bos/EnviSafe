import React from "react";
// import Typewriter from "typewriter-effect";

const Hero = () => {
  return (
    <div>
      <section className=" bg-white">
        <div className="px-6 py-12 lg:my-0 md:px-12 text-gray-800 text-center lg:text-left">
          <div className="container mx-auto xl:px-32">
            <div className="lg:flex justify-between items-center  sm:flex-row">
              <div className="my-10">
                <h1 className="text-xl md:text-3xl xl:text-4xl font-bold tracking-tight text-black-400 mb-16">
                 <span>Lorem ipsum dolor sit amet, consectetur</span>
                  {/* <span className="text-primary">among</span> */}
                  <span className="text-primary">
                  jjjdkks
                    </span>
                </h1>
                <p class="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-lg dark:text-gray-400">
                  Lorem ipsum dolor sit amet.
                </p>
               <a
                  href="/"
                  class="inline-block rounded-md  px-6 outline-1 py-1.5 text-base font-semibold leading-7 text-black shadow-sm ring-1 ring-green-600 bg-white hover:bg-green-600 hover:text-white drop-shadow-sm hover:ring-white"
                >
                  Get started
                </a>
              </div>
              <div className="grid place-items-center max-sm:hidden">
                <img
                  className=""
                  src="./Images/i1.svg"
                  alt="React Logo"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;
