import styles from "../styles/style";
import { motion } from "framer-motion";
import { parthmittal } from "../assets";

const Loading = ({ isLoading }) => {
  return (
    <div
      id="loading"
      className={`w-[100vw] h-[100vh] flex "${styles.flexCenter}`}
      initial={{ scale: 1.0, opacity: 0.25 }}
      animate={{ scale: 2.0, opacity: 0.75 }}
      transition={{
        yoyo: Infinity,
        duration: 1.0,
        ease: "easeIn",
      }}
    >
      <img src={parthmittal} alt="Parth Mittal" className="w-[80px] h-[80px]" />
    </div>
  );
};

export default Loading;
