import React from "react";
const Password = () => {
  return (
             <section className="bg-gray-50 min-h-screen flex items-center justify-center">
      <div
        className="bg-gray-200 flex rounded-2xl shadow-lg max-w-3xl p-5 items-center"
      >
        <div className="">
          <h2 className="font-bold text-l text-[#002D74] text-center">Forget your password?</h2>
          <p className="text-xs mt-4 text-[#002D74] text-center">
            Enter your email address to reset your password
          </p>
          <form action="" className="flex flex-col gap-4 ">
             <input className="p-2 mt-8  rounded-xl border" type="email" name="email" placeholder="Email" required></input>

        <button className="bg-[#27AE60] rounded-xl text-white py-2 hover:scale-105 duration-300">Submit</button>
          </form>
          

          {/* <div className="flex items-center content-center">
            <img src="./images/hero-img.svg" className="w-48 h-48 m-auto" alt="" />
          </div> */}

         
    </div>
      </div>
    </section> 
  )
};

export default Password;
