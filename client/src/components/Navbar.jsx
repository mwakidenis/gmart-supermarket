import React, { useState, useEffect } from "react";
import Fuse from "fuse.js";
import { FaSearch } from "react-icons/fa";
import { FaMapMarkerAlt } from "react-icons/fa"; // Import a location icon
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import PersonIcon from "@mui/icons-material/Person";
import AddIcon from "@mui/icons-material/Add";
import Typography from "@mui/material/Typography";
import { blue } from "@mui/material/colors";
import { Input } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useCart } from "../actions/CartControl";
import SimpleDialog from "./SimpleDialog";
import SimpleDialog2 from "./SimpleDialog2";
import SimpleDialog3 from "./SimpleDialog3";
import axios from "axios";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [datas, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setIsLogin(true);
    }

    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://gmart-supermarket.vercel.app/allProducts"
        );
        console.log(response.data);
        setData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const options = {
    keys: ["label"],
    includeScore: true,
    threshold: 0.4,
  };

  const data = [];

  for (let i = 0; i < datas.length; i++) {
    data.push({ label: datas[i].productName, id: datas[i].id });
  }

  const fuse = new Fuse(data, options);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.length > 0) {
      const results = fuse.search(value);
      setSearchResults(results.map((result) => result.item));
    } else {
      setSearchResults([]);
    }
  };
  const {
    cartItems,
    addToCart,
    isLogin,
    setIsLogin,
    name,
    setName,
    userDetails,
    setUserDetails,
    startflag,
    setStartFlag,
  } = useCart();
  const [open, setOpen] = useState(
    startflag === 0 && !localStorage.getItem("userPincode") ? true : false
  );
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);

  const handleClickOpen2 = () => {
    setOpen2(true);
  };

  const handleClickOpen3 = () => {
    setOpen3(true);
  };

  const handleClose2 = (value) => {
    setOpen2(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
    handleClickOpen2();
  };

  const handleClose = (value) => {
    setOpen(false);

    if (startflag === 0) {
      handleClickOpen2();
      setStartFlag((prev) => prev + 1);
    }
  };

  const handleClose3 = () => {
    setOpen3(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const userDetail = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="relative" onClick={() => isMobileMenuOpen && setIsMobileMenuOpen(false)}>
      <div
        className="w-0 h-0 md:flex md:justify-center md:items-center md:h-11 overflow-visible z-[999] mt-2 md:w-full mb-[-10px] lg:w-0 lg:h-0"
        onClick={() => {
          navigate("/");
        }}
      >
        <img
          src="/logo.svg"
          alt="Logo"
          className="lg:w-[150px] z-[99999] md:w-[150px]"
        />
      </div>

      <nav className="md:p-2 shadow-md fixed justify-center z-50 flex  bg-white w-screen">
        <div className="md:flex items-center  w-full lg:p-4 justify-between gap-0 relative sm:block">
          <div className="flex items-center p-0 gap-2 justify-between w-full">
            <div
              className="text-white text-2xl font-bold mb-4 md:mb-0 cursor-pointer  sm:w-auto md:w-0 lg:w-fit sm:flex sm:justify-center sm:items-center"
              onClick={() => {
                navigate("/");
              }}
            >
              <img
                src="/logo.svg"
                alt=""
                className="md:w-[0] lg:w-[150px]  sm:w-[100px] "
              />
            </div>
            <div className="md:flex gap-2 md:gap-1 md:justify-center md:scale-90 lg:scale-100  md:items-center md:w-fit sm:hidden">
              {/* Combined Location and Delivery/Pickup Div */}
              <button
                className="h-12 flex px-4 lg:h-fit py-2 flex-row justify-between items-center lg:scale-100 md:px-2 bg-gray-100 shadow-md rounded-full "
                onClick={handleClickOpen}
              >
                <div className="flex flex-row items-center justify-center gap-2">
                  <img src="/location.svg" alt="Location" />
                  <div className="relative flex flex-col justify-start text-left mt-[-3px] text-base leading-4 group">
                    <span className="text-base text-blue-400">
                      {localStorage.getItem("orderType") || "Delivery"}
                    </span>
                    <span className="m-0">
                      {localStorage
                        .getItem("userArea")
                        ?.split(" ")
                        .slice(0, 2)
                        .join(" ") || "Nairobi"}
                    </span>

                    {/* Tooltip for pincode on hover */}
                    <div className="absolute top-12 left-0 text-lg hidden bg-gray-100 group-hover:flex items-center justify-center w-max p-2 text-black border border-gray-300 rounded-lg shadow-xl z-10 transition-transform duration-300 ease-out transform translate-y-0 group-hover:translate-y-2 opacity-0 group-hover:opacity-100">
                      <span className="text-base">
                        {localStorage.getItem("userPincode") || "00100"}
                      </span>
                    </div>
                  </div>
                </div>
                <img src="/dropdown_nav.svg" alt="Dropdown arrow" />
              </button>

              <button className="p-2 bg-white shadow-md rounded sm:hidden">
                <img src="/search.svg" alt="" />
              </button>
            </div>
            {/* Hamburger Menu Button - Mobile Only */}
            <button
              className="text-gray-800 focus:outline-none md:hidden p-2 z-[99999] mr-2 relative"
              onClick={(e) => {
                e.stopPropagation();
                toggleMobileMenu();
              }}
            >
              <svg
                className="h-7 w-7"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
          <div className="flex-grow md:max-w-[360px] lg:max-w-[460px] mx-4 bg-slate-100 mb-4 md:mb-0 flex flex-row items-center rounded-r-full rounded-l-full shadow-md h-14 pl-10 pr-10 relative">
            <FaSearch className="-ml-7 mr-2 text-lime-400" />
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={handleSearch}
              className="w-full py-2 rounded relative bg-transparent text-black focus:outline-none sm:w-full"
            />

            {searchResults.length > 0 && (
              <div className="absolute top-full left-0 mt-1 p-2 bg-white shadow-lg rounded w-full z-50">
                {searchResults.map((result) => (
                  <div
                    key={result.label}
                    className="p-2 hover:bg-gray-200 cursor-pointer"
                    onClick={() => {
                      setSearchTerm(`${result.label}`);
                      setSearchResults([]);
                      navigate(`/product/${result.id}`);
                    }}
                  >
                    {result.label}
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="flex md:justify-end md:flex gap-5 w-fit relative shrink-0">
            {/* Mobile Menu Dropdown */}
            {isMobileMenuOpen && (
              <div 
                className="fixed top-0 right-0 w-80 bg-white shadow-2xl rounded-b-lg p-4 z-[9999] md:hidden border-b border-gray-200 max-h-[calc(100vh-4rem)] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex flex-col gap-4">
                  {/* Location Button - Mobile */}
                  <button
                    type="button"
                    className="w-full flex px-4 py-3 flex-row justify-between items-center bg-gray-100 shadow-md rounded-lg pointer-events-auto"
                    onClick={() => {
                      handleClickOpen();
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    <div className="flex flex-row items-center justify-center gap-2">
                      <img src="/location.svg" alt="Location" className="w-5 h-5" />
                      <div className="flex flex-col justify-start text-left text-sm">
                        <span className="text-sm text-blue-400 font-medium">
                          {localStorage.getItem("orderType") || "Delivery"}
                        </span>
                        <span className="text-xs text-gray-600">
                          {localStorage
                            .getItem("userArea")
                            ?.split(" ")
                            .slice(0, 2)
                            .join(" ") || "Nairobi"}
                        </span>
                      </div>
                    </div>
                    <img src="/dropdown_nav.svg" alt="Dropdown arrow" className="w-4 h-4" />
                  </button>

                  {/* Login/Profile */}
                  {!isLogin ? (
                    <button
                      type="button"
                      className="w-full flex items-center gap-3 px-4 py-3 bg-gray-100 rounded-lg hover:bg-gray-200 transition pointer-events-auto"
                      onClick={() => {
                        navigate("/sign");
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      <img src="user.svg" alt="User" className="w-5 h-5" />
                      <span className="text-gray-800 font-medium">Login</span>
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="w-full flex items-center gap-3 px-4 py-3 bg-gray-100 rounded-lg hover:bg-gray-200 transition pointer-events-auto"
                      onClick={() => {
                        setOpen3(true);
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      <img
                        src={
                          userDetail?.photoURL ||
                          "https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI="
                        }
                        alt="Profile"
                        className="rounded-full h-8 w-8 border-2 border-blue-50"
                      />
                      <span className="text-gray-800 font-medium">
                        {userDetail?.displayName || userDetail?.name}
                      </span>
                    </button>
                  )}

                  {/* Cart */}
                  <button
                    type="button"
                    className="w-full flex items-center justify-between px-4 py-3 bg-gray-100 rounded-lg hover:bg-gray-200 transition pointer-events-auto"
                    onClick={() => {
                      navigate("/cart");
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <img src="cart.svg" alt="Cart" className="w-5 h-5" />
                      <span className="text-gray-800 font-medium">Cart</span>
                    </div>
                    <div className="bg-lime-400 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                      {cartItems.length}
                    </div>
                  </button>

                  {/* My Orders */}
                  <button
                    type="button"
                    className="w-full flex items-center gap-3 px-4 py-3 bg-gray-100 rounded-lg hover:bg-gray-200 transition pointer-events-auto"
                    onClick={() => {
                      if (!isLogin) {
                        navigate("/sign");
                      } else {
                        navigate("/orders");
                      }
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    <img src="my-orders-icon.svg" alt="Orders" className="w-5 h-5" />
                    <span className="text-gray-800 font-medium">My Orders</span>
                  </button>
                </div>
              </div>
            )}

            <div className="md:flex items-center hidden gap-4 shrink-0 whitespace-nowrap">
              {!isLogin ? (
                <>
                  <div
                    className="flex items-center gap-2 shrink-0 cursor-pointer"
                    onClick={() => {
                      navigate("/sign");
                    }}
                  >
                    <img src="user.svg" alt="" />
                    <button className="">Login</button>
                  </div>
                </>
              ) : (
                <>
                  <div
                    className="flex items-center w-fit h-14justify-center"
                    onClick={() => {
                      setOpen3(true);
                    }}
                  >
                    <img
                      src={
                        userDetail.photoURL ||
                        "https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI="
                      }
                      alt=""
                      className=" rounded-full h-10 items-center border-2 border-blue-50 w-10"
                    />
                    <button className="p-0 m-0  w-24 " onClick={() => {}}>
                      {userDetail.displayName || userDetail.name}
                    </button>
                  </div>
                </>
              )}

              <div
                className="flex relative w-fit bg-gray-100 pl-2 lg:px-4 py-2 shadow-md rounded-full shrink-0"
                onClick={() => {
                  // addToCart({id:1, name:'Product 1', price:100, qty:1});
                  navigate("/cart");
                }}
              >
                <img src="cart.svg" alt="" />
                <button className="pr-5 ">Cart</button>
                <div className=" absolute top-0 right-0 w-4 bg-lime-400 rounded-full h-4 text-xs text-center ">
                  {cartItems.length}
                </div>
              </div>

              <div className="flex bg-gray-100 rounded-full shadow-md px-2 lg:px-4 gap-2 shrink-0">
                <img src="my-orders-icon.svg" alt="" className="w-5" />
                <button
                  className="leading-6 md:text-sm lg:text-base "
                  onClick={() => {
                    if (!isLogin) {
                      navigate("/sign");
                    } else {
                      navigate("/orders");
                    }
                  }}
                >
                  My <br></br>Orders
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <SimpleDialog open={open} onClose={handleClose} />

      <SimpleDialog2
        open={open2}
        onClose={handleClose2}
        handleOption={(value) => {
          localStorage.setItem("orderType", value);
          handleClickOpen2();
        }}
      />

      <SimpleDialog3
        open={open3}
        onClose={handleClose3}
        setIsLogin={setIsLogin}
      />
    </div>
  );
};

export default Navbar;
