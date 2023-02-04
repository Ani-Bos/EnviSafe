

import { useState } from "react";
import { useNavigate } from "react-router-dom";
const SideNav = () => {
  let navigate=useNavigate();
  const [open, setOpen] = useState(false);
  const Menus = [
    { title: "Dashboard", src: "Chart_fill" ,path:"/dashboard"},
    { title: "Activity", src: "Chat" ,path:"/activity"},
    { title: "Accounts", src: "User", gap: true ,path:"/dashboard"},
    { title: "Schedule ", src: "Calendar",path:"/dashboard" },
    { title: "Search", src: "Search" ,path:"/dashboard"},
    { title: "Analytics", src: "Chart" ,path:"/dashboard"},
    { title: "Setting", src: "Setting",path:"/dashboard" },
  ];

  return (
    <div className="flex w-[fit-content]">
      <div
        className={` ${
          open ? "w-72" : "w-20 "
        } bg-dark-green h-screen p-5  pt-8 relative duration-300`}
      >
        <img alt=""
          src="./images/control.png"
          className={`absolute cursor-pointer -right-3 top-9 w-7 border-dark-green
           border-2 rounded-full  ${!open && "rotate-180"}`}
          onClick={() => setOpen(!open)}
        />
        <div className="flex gap-x-4 items-center">
          <img alt=""
            src="./images/logo.png"
            className={`cursor-pointer duration-500 ${
              open && "rotate-[360deg]"
            }`}
          />
          <h1
            className={`text-white origin-left font-medium text-xl duration-200 ${
              !open && "scale-0"
            }`}
          >
            User
          </h1>
        </div>
        <ul className="pt-6">
          {Menus.map((Menu, index) => (
            <li onClick={()=>{navigate(`${Menu.path}`)}}
              key={index}
              className={`flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 
              ${Menu.gap ? "mt-9" : "mt-2"} ${
                index === 0 
              } `}
            >
              <img src={`./images/${Menu.src}.png`} alt=""/>
              <span className={`${!open && "hidden"} origin-left duration-200`}>
                {Menu.title}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
export default SideNav;
