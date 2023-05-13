import styles from "../styles/style";
import Lottie from "react-lottie-player";
import animationData from "../assets/quiz-mode-teal-dark.json";

// lottie config
const Hero = () => {
  return (
    <section
      id="home"
      className={`flex md:flex-row flex-col ${styles.paddingY}`}
    >
      <div
        className={`flex-1 ${styles.flexStart} flex-col xl:px-0 sm:px-16 px-6`}
      >
        {/* Hero text */}
        <div className="flex flex-row justify-between items-center w-full text-black">
          <h1 className="flex-1 font-poppins font-semibold ss:text-[72px] text-[52px] text-black ss:leading-[80px] leading-[80px]">
            Hi, there!
            <br className="sm:block hidden" /> I am
          </h1>
        </div>

        <h1 className="font-poppins font-semibold ss:text-[68px] text-[52px] text-black ss:leading-[80px] leading-[80px] w-full">
          <span className="text-gradient">HMap.ai</span>
        </h1>
        <p className={`${styles.paragraph} max-w-[470px] mt-5`}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut sed cum placeat maxime ducimus nisi autem iusto ab cumque quae exercitationem, labore alias dolor, ipsam maiores architecto voluptatem consequuntur et.
        </p>
      </div>

      <div
        className={`flex-1 flex ${styles.flexCenter} md:my-0 my-10 relative`}
      >
        <div className="relative z-index-[5] h-[100%] w-[85%]">
          <Lottie loop animationData={animationData} play />
        </div>
        <div className="absolute z-[1] w-[50%] h-[50%] rounded-full bottom-40 white__gradient"></div>
      </div>
    </section>
  );
};

export default Hero;