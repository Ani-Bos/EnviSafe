import React from "react";
import {Link, useNavigate} from 'react-router-dom'
import { useState } from "react";

import Cookies from 'js-cookie'
const Navbar = () => {
  let navigate=useNavigate();
  const [navbar, setNavbar] = useState(false);
  return (
    <nav className="  w-full bg-white bg-black-900 shadow backdrop-filter backdrop-blur-lg  bg-opacity-100">
      <div className="justify-between px-4 mx-auto lg:max-w-8xl md:items-center md:flex md:px-8">
        <div>
          <div className="flex items-center justify-between py-3 md:py-5 md:block">
            <Link to="/">
              <h1 className="text-2xl md:text-3xl xl:text-4xl font-bold tracking-tight text-green-400">
                Envy<span className="text-primary">Safe</span>
              </h1>
              {/* <img className="h-20 w-20 self-center" src="./images/img1.svg" alt="" /> */}
            </Link>
            <div className="md:hidden">
              <button
                className="p-2 text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border"
                onClick={() => setNavbar(!navbar)}
              >
                {/* navbar == true -> display the nav links and so cross icon is shown to close them */}
                {navbar ? (
                  <img
                    h-2
                    src="./Images/i2.svg"
                    alt="hamburger-1"
                  ></img>
                ) : (
                  <img src="./Images/i3.svg" alt="hamburger-2"></img>
                )}
              </button>
            </div>
          </div>
        </div>
        <div>
          <div
            // className={navbar ? "hidden" : "block"}
            className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${
              navbar ? "block" : "hidden"
            }`}
          >
            <ul className="items-center justify-center space-y-8 mb-3 md:flex md:space-x-6 md:space-y-0 ">
              <li className="p-2 space-x-8 text-gray-600 h-10  rounded-md hover:text-black hover:font-bold">
                <Link to="/">Home</Link>
              </li>
              <li className="p-2 text-gray-600 h-10 hover:text-black hover:font-bold">
                <Link to="/">Features</Link>
              </li>
              <li className="p-2 space-x-8 text-gray-600  h-10 hover:text-black  hover:font-bold">
                <Link to="/">Contact Us</Link>
              </li>
             {!Cookies.get('auth-Tokensynex') ?<><li>
                <Link
                  to="/login"
                  className="p-2 space-x-8 text-gray-600  h-10 hover:text-black  hover:font-bold"
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  to="/Signup"
                  class="inline-block rounded-md  px-6 outline-1 py-1.5 text-base font-semibold leading-7 text-black shadow-sm ring-1 ring-green-600 bg-white hover:bg-green-600 hover:text-white drop-shadow-sm hover:ring-white"
                >
                  Sign Up
                </Link>
              </li></>:<>
              <li>
              <Link to='/dashboard'>  <button className="inline-block rounded-md  px-6 outline-1 py-1.5 text-base font-semibold leading-7 text-black shadow-sm ring-1 ring-green-600 bg-white hover:bg-green-600 hover:text-white drop-shadow-sm hover:ring-white">
                  Dashboard
                </button></Link>
              </li>
              <li>
                <button onClick={()=>{
                  Cookies.remove('email');
                  Cookies.remove('auth-Tokensynex');
                  Cookies.remove('name')
                  Cookies.remove('email')
                  navigate('/')
                }} className="inline-block rounded-md  px-6 outline-1 py-1.5 text-base font-semibold leading-7 text-black shadow-sm ring-1 ring-green-600 bg-white hover:bg-green-600 hover:text-white drop-shadow-sm hover:ring-white">
                  Signout
                </button>
                
                </li> </>}
                
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
