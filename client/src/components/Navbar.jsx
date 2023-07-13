import { useEffect, useState } from "react";
import { navLinks } from "../constants";
import styles from "../styles/style";
import Link from "next/link";
import classes from "./Navbar.module.css";
import { useRouter } from "next/router";
import { supabase } from "@/utils/supabase";


const Navbar = ({ user }) => {
  const [toggle, setToggle] = useState(false);
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    if (user) {
      setIsLoggedIn(true)
    }
  }, [user])

  const userLogOut = async () => {
    try {
      const { error } = await supabase.auth.signOut()

      router.push('/')
    } catch (error) {
      console.log(error)
    }
  }

  console.log(user)

  return (
    <div className={styles.flexCenter}>
      <div className={`${styles.boxWidth}`}>
        <nav className={`w-full flex justify-between items-center navbar bg-opacity-25 bg-gray-800 ${styles.paddingX}`}>
          {/* Logo */}
          <Link href="/">
            <img
              src="/assets/comicify_ai.svg"
              alt="Comicify.AI"
              className="w-[80px] h-[80px]"
            />
          </Link>

          {/* List of links */}
          <ul className="list-none sm:flex hidden justify-end items-center flex-1">
            {navLinks.map((nav, index) => (
              <li
                key={index}
                className={`font-poppins
            cursor-pointer
            text-[16px]
            font-semibold
            mr-4 
            text-white text-bold hover:text-teal-300 ${classes.hoverUnderlineAnimation}`}
              >
                <Link href={`${nav.url}`} target="_blank">{nav.title}</Link>
              </li>
            ))}
            {isLoggedIn
              ? <li>
                <button
                  onClick={() => {
                    userLogOut()
                  }}
                  className="bg-teal-600 hover:bg-teal-900 text-white py-3 px-6 rounded-full drop-shadow-2xl font-poppins font-semibold text-[16px]" >
                  Logout
                </button>
              </li>
              : <li>
                <button className="bg-teal-600 hover:bg-teal-900 text-white py-3 px-6 rounded-full drop-shadow-2xl font-poppins font-semibold text-[16px]" onClick={() => router.push("/auth/login")}>
                  Register/Login
                </button>
              </li>
            }
          </ul>

          {/* only for mobile devices, created separately */}
          <div className="sm:hidden flex flex-1 justify-end items-center">
            {/* shows toggle icon based on its state */}
            <img
              src={toggle ? "/assets/close.svg" : "/assets/menu.svg"}
              alt="menu"
              className="w-[28px] h-[28px] object-contain"
              // correct way to change state using the prev
              // version of the same state using a callback function
              onClick={() => setToggle((prev) => !prev)}
            />

            <div
              className={`${toggle ? "flex" : "hidden"} p-6 bg-black-gradient
        absolute top-20 right-0 mx-4 my-2
        min-w-[140px] rounded-xl sidebar`}
            >
              <ul className="list-none flex flex-col justify-end items-center flex-1">
                {navLinks.map((nav, index) => (
                  <li
                    key={index}
                    className={`font-poppins
              font-normal
              cursor-pointer
              text-[16px]
              mb-4
              text-white text-bold`}
                  >
                    <Link href={`${nav.url}`} target="_blank">{nav.title}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
