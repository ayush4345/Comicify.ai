import { useState } from "react";
import { navLinks } from "../constants";
import styles from "../styles/style";
import Link from "next/link";


const Navbar = () => {
  const [toggle, setToggle] = useState(false);

  return (
    <div className={`${styles.paddingX} ${styles.flexCenter}`}>
      <div className={`${styles.boxWidth}`}>
        <nav className="w-full flex justify-between items-center navbar">
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
                key={nav.id}
                className={`font-poppins
            font-normal
            cursor-pointer
            text-[16px]
            ${index === navLinks.length - 1 ? "mr-0" : "mr-10"}
            text-black hover:text-teal-200`}
              >
                <Link href={`#${nav.id}`}>{nav.title}</Link>
              </li>
            ))}
          </ul>

          {/* only for mobile devices, created separately */}
          <div className="sm:hidden flex flex-1 justify-end items-center">
            {/* shows toggle icon based on its state */}
            <img
              src={toggle ? "./assets/close.svg" : "./assets/menu.svg"}
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
                    key={nav.id}
                    className={`font-poppins
              font-normal
              cursor-pointer
              text-[16px]
              ${index === navLinks.length - 1 ? "mb-0" : "mb-4"}
              text-black`}
                  >
                    <Link href={`#${nav.id}`}>{nav.title}</Link>
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
