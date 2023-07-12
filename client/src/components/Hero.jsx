import styles from "../styles/style";
import Lottie from "react-lottie-player";
import animationData from '@/../../public/assets/astronout.json';
import { useRouter } from "next/router";
import { useEffect } from "react";
import Link from "next/link";

// lottie config
const Hero = () => {
  const router = useRouter()

  useEffect(() => {
    document.title = "ComicifyAI";
  }, []);

  return (
    <section
      id="home"
      className={`flex md:flex-row flex-col mb-14 ${styles.paddingY}`}
    >
      <div className="flex flex-col w-full items-center justify-center">
        <div className=" text-base text-white font-semibold bg-[#ff6154] p-3 rounded-xl -skew-y-6 mt-5 px-6">
          <Link target="_blank" href="https://www.producthunt.com/posts/comicify-ai">#19 Product of the Day on Product Hunt</Link>
        </div>
        <div className="flex flex-col items-center justify-center">
          <Lottie loop animationData={animationData} play className="h-[69vh]" />
          <button className="bg-teal-600 hover:bg-teal-900 text-white py-3 px-6 rounded-full drop-shadow-2xl font-poppins font-semibold text-2xl" onClick={() => router.push("/dashboard")}>
            Get Started
          </button>
        </div>
        {/* </div> */}
        {/* <div className="bg-opacity-75 bg-gray-600 w-1/3"></div> */}
      </div>




    </section>
  );
};

export default Hero;