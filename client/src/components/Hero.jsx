import styles from "../styles/style";
import Lottie from "react-lottie-player";
import animationData from '@/../../public/assets/astronout.json';
import { useRouter } from "next/router";

// lottie config
const Hero = () => {
  const router = useRouter()

  return (
    <section
      id="home"
      className={`flex md:flex-row flex-col ${styles.paddingY}`}
    >

<div className="flex  w-full items-center justify-center">
  {/* <div className="bg-opacity-75 bg-gray-600 w-1/3"></div> */}
  {/* <div cd className="w-1/3 relative"> */}
    {/* <div className="absolute inset-0 bg-gradient-to-br from-black to-transparent"></div> */}
    <div className="flex flex-col items-center justify-center">
      <Lottie loop animationData={animationData} play className="h-[69vh]"/>
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