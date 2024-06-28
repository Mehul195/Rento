import { Avilablepro } from "../components/Avilablepro";
import { Button } from "@mui/material";
import "./Landing.css";
import { Navigate, useNavigate } from "react-router-dom";
import BannerBackground from "../assets/Group 1881.png";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { propertiesAtom } from "../store/atoms/properties";
import { useRecoilValue} from "recoil";
import { searchedValueAtom, userState } from "../store/atoms/user";
import { motion } from "framer-motion";
import TopBar from "./../components/TopBar"

export const Landing = () => {
  const [searchedValue, setSearchedValue] = useRecoilState(searchedValueAtom);
  const navigate = useNavigate();
  const [properties, setProperties] = useRecoilState(propertiesAtom);

  const fetchProperties = async () => {
    
    try {
      const response = await axios.get(
        "http://localhost:8000/user/getallposts",
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setProperties(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  const sliderVariants = {
    initial: {
      scale: 0.5, // Start with a smaller size
    },
    animate: {
      scale: 1, // Scale to normal size
      transition: {
        type: "spring", 
        stiffness: 100,
        damping: 10, 
        duration: 0.5, 
      },
    },
  };
  

  return (
    <>
    <TopBar />
      <div className="flex flex-col min-h-[100dvh]">
        <main className="flex-1">
          <section className="w-full py-8 md:py-24 xl:py-32">
            <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6 lg:gap-10">
              <motion.div className="space-y-3"
                variants={sliderVariants}
                initial="initial"
                animate="animate"
              >
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-6xl/none overflow-hidden">
                  Find your perfect rental
                </h1>
                <motion.p
      className="mx-auto max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400 overflow-hidden"
      variants={{
        hidden: {
          opacity: 0,
        },
        visible: {
          opacity: 1,
          transition: {
            delay: 0.5, // Delay before animation starts
            type: "tween", // Use tween animation for a smoother effect
            duration: 2, // Adjust duration for speed
            ease: "easeInOut", // Use easeInOut easing function
            repeat: Infinity, // Repeat animation indefinitely
            repeatType: "reverse", // Reverse animation after each repeat
          },
        },
      }}
      initial="hidden"
      animate="visible"
    >
      Search for rental properties by city, Size or location
    </motion.p>
              </motion.div>
              <div className="mx-auto w-full max-w-sm space-y-2">
                <form className="flex flex-col gap-2">
                  <input
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 min-[400px]:grid-cols-2"
                    placeholder="Enter a location"
                    type="text"
                    onChange={(e)=>{setSearchedValue(e.target.value)}}
                  />
                </form>
              </div>
            </div>
          </section>
          <section className="w-full py-12 md:py-0.5 lg:py-0.5">
            <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
              <div className="space-y-3">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl overflow-hidden">
                  Available Properties
                </h2>
              </div>
              <Avilablepro />
            </div>
          </section>
        </main>
        <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            © 2024 Aalok Aaradhya All rights reserved.
          </p>
          <nav className="sm:ml-auto flex gap-4 sm:gap-6">
            <a className="text-xs hover:underline underline-offset-4" href="#">
              Terms of Service
            </a>
            <a className="text-xs hover:underline underline-offset-4" href="#">
              Privacy
            </a>
          </nav>
        </footer>
      </div>
    </>
  );
};
