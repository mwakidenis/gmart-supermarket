import { Outlet, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Preloader from "../components/Preloader";
import Easter from "../components/Easter";

async function countWordOccurrences(array, word) {
  let count = 0;
  for (let i = 0; i < array.length; i++) {
    if (array[i] === word) {
      count++;
    }
  }
  return count;
}

function Layout() {
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [openedLocation, setOpenedLocation] = useState([]);
  const [easter, setEaster] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setOpenedLocation([...openedLocation, location.pathname]);
      const countOpenedLocation = await countWordOccurrences(
        openedLocation,
        location.pathname
      );
      if (openedLocation.includes(location.pathname)) 
      {
        if (countOpenedLocation === 7) 
        {
          console.log("Easter Egg, You were on "+location.pathname+" page 7 times");
          console.log(openedLocation);
          setEaster(true);
          setTimeout(() => {
            setEaster(false);
            console.log("Easter Egg Closed");
          }, 5000);

        } 
        else 
        {
          
          setLoading(false);
          setTimeout(() => {
            setLoading(false);
          }, 500);
          console.log("Not a Easter Egg");
        }
      }else
      { 
        console.log("Preloader is set for loading once per page for cache purpose");
        setLoading(true);
        setTimeout(() => {
          setLoading(false);
        }, 500);
      }
    }


    fetchData();
  }, [location]);

  const excludedPathsNavbar = ['/vendor','/vendor/orders','/vendor/products'];
  const excludedPathsFooter = ["/sign",'/categories/:categoryName','/vendor','/vendor/orders','/vendor/products'];

  const isExcludedPathNavbar = excludedPathsNavbar.includes(location.pathname);
 
  const isExcludedPathFooter = excludedPathsFooter.some((path) =>
    path.includes(":categoryName") ? location.pathname.startsWith("/categories/") : path === location.pathname
  );


  return easter ? (
    <Easter />
  ) :
  (loading ? (
     (
      <Preloader />
    )
  ) : (
    <div>
      {!isExcludedPathNavbar && <Navbar />}
      <Outlet />
      {!isExcludedPathFooter && <Footer />}
    </div>
  ));
}

export default Layout;
