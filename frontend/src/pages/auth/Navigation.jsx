import { useState } from "react";
import {
  AiOutlineHome,
  AiOutlineLogin,
  AiOutlineUserAdd,
  AiOutlineMessage 
} from "react-icons/ai";
import { IoSearch } from "react-icons/io5";
import { IoIosMore } from "react-icons/io";

import { MdExplore } from "react-icons/md";
import { FaRegHeart } from "react-icons/fa";
import { FaThreads } from "react-icons/fa6";
import { MdCreateNewFolder } from "react-icons/md";
import { BsCameraReels } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./Navigation.css";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../../redux/api/userApiSlice";
import { logout } from "../../redux/feature/auth/authSlice"
import { Avatar, AvatarFallback ,AvatarImage} from "@/components/ui/avatar";

// import FavoritesCount from "../../pages/products/FavoritesCount";

const Navigation = () => {
  const { userInfo } = useSelector((state) => state.auth);
//   const { cartItems } = useSelector((state) => state.cart);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      style={{ zIndex: 9999 }}
      className={`${
        showSidebar ? "hidden" : "flex"
      } xl:flex lg:flex md:hidden sm:hidden flex-col justify-between p-4 text-white bg-[#000] w-[4%] hover:w-[15%] h-[100vh]  fixed `}
      id="navigation-container"
    >
      <div className="flex flex-col justify-center space-y-4">
        <Link
          to="/"
          className="flex items-center transition-transform transform hover:translate-x-2"
        >
          <AiOutlineHome className="mr-2 mt-[2rem]" size={26} />
          <span className="hidden nav-item-name mt-[2rem]">HOME</span>{" "}
        </Link>

        <Link
          to="/search"
          className="flex items-center transition-transform transform hover:translate-x-2"
        >
          <IoSearch className="mr-2 mt-[2rem]" size={26} />
          <span className="hidden nav-item-name mt-[2rem]">Search</span>{" "}
        </Link>

        <Link to="/explore" className="flex relative">
          <div className="flex items-center transition-transform transform hover:translate-x-2">
            <MdExplore className="mt-[2rem] mr-2" size={26} />
            <span className="hidden nav-item-name mt-[2rem]">Explore</span>{" "}
          </div>

          {/* <div className="absolute top-9">
            {cartItems.length > 0 && (
              <span>
                <span className="px-1 py-0 text-sm text-white bg-pink-500 rounded-full">
                  {cartItems.reduce((a, c) => a + c.qty, 0)}
                </span>
              </span>
            )}
          </div> */}
        </Link>


        <Link to="/reels" className="flex relative">
          <div className="flex justify-center items-center transition-transform transform hover:translate-x-2">
            <BsCameraReels className="mt-[2rem] mr-2" size={20} />
            <span className="hidden nav-item-name mt-[2rem]">
              Reels
            </span>{" "}
            {/* <FavoritesCount /> */}
          </div>
        </Link>
      <Link
          to="/message"
          className="flex items-center transition-transform transform hover:translate-x-2"
        >
          <AiOutlineMessage className="mr-2 mt-[2rem]" size={26} />
          <span className="hidden nav-item-name mt-[2rem]">Message</span>{" "}
        </Link>
        <Link
          to="/notification"
          className="flex items-center transition-transform transform hover:translate-x-2"
        >
          <FaRegHeart className="mr-2 mt-[2rem]" size={26} />
          <span className="hidden nav-item-name mt-[2rem]">Notifications</span>{" "}
        </Link>
        <Link
          to="/create"
          className="flex items-center transition-transform transform hover:translate-x-2"
        >
          <MdCreateNewFolder className="mr-2 mt-[2rem]" size={26} />
          <span className="hidden nav-item-name mt-[2rem]">Create</span>{" "}
        </Link>
      </div>


      <div className="relative mt-[2rem]">
        <button
          onClick={toggleDropdown}
          className="flex items-center text-gray-800 focus:outline-none"
        >
          {userInfo ? (
            <div>

            <Avatar className='w-6 h-6'>
            <AvatarImage src={userInfo?.profilePicture} alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
        </Avatar>
            </div>
          ) : (
            <></>
          )}
          {userInfo && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-4 w-4 ml-1 ${
                dropdownOpen ? "transform rotate-180" : ""
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={dropdownOpen ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"}
              />
            </svg>
          )}
        </button>

        {dropdownOpen && userInfo && (
          <ul
            className={`absolute right-0 mt-2 mr-14 space-y-2 bg-white text-gray-600 ${
              !userInfo.isAdmin ? "-top-20" : "-top-80"
            } `}
          >
           

            <li>
              <Link to="/profile" className="block px-4 py-2 hover:bg-gray-100">
                Profile
              </Link>
            </li>
            <li>
              <button
                onClick={logoutHandler}
                className="block w-full px-4 py-2 text-left hover:bg-gray-100"
              >
                Logout
              </button>
            </li>
          </ul>
        )}
        {!userInfo && (
          <ul>
            <li>
              <Link
                to="/login"
                className="flex items-center mt-5 transition-transform transform hover:translate-x-2"
              >
                <AiOutlineLogin className="mr-2 mt-[4px]" size={26} />
                <span className="hidden nav-item-name">LOGIN</span>
              </Link>
            </li>
            <li>
              <Link
                to="/register"
                className="flex items-center mt-5 transition-transform transform hover:translate-x-2"
              >
                <AiOutlineUserAdd size={26} />
                <span className="hidden nav-item-name">REGISTER</span>
              </Link>
            </li>
          </ul>
        )}
      </div>
      <Link
          to="/thread"
          className="flex items-center transition-transform transform hover:translate-x-2"
        >
          <FaThreads className="mr-2 mt-[2rem]" size={26} />
          <span className="hidden nav-item-name mt-[2rem]">Thread</span>{" "}
        </Link>
        <Link
          to="/more"
          className="flex items-center transition-transform transform hover:translate-x-2"
        >
          <IoIosMore className="mr-2 mt-[2rem]" size={26} />
          <span className="hidden nav-item-name mt-[2rem]">More</span>{" "}
        </Link>
    </div>
  );
};

export default Navigation;