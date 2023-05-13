
import React from "react";
import { motion } from "framer-motion";
import styles from "../styles/style";

import {
  Navbar,
  // Footer,
  // Services,
  Hero,
  Loading
  // Transactions,
} from "../components";

export default function Home() {

  const [isLoading,setIsLoading] = React.useState(true);

  React.useEffect(()=>{
    setTimeout(()=>{setIsLoading(false)},1600);
  },[])

  if(isLoading){
    return (
      <div className="bg-primary w-full overflow-hidden">
        <Loading/>
      </div>
    )
  }else{
    return (
      // A div to wrap the entire application
    <div className="bg-primary w-full overflow-hidden">
      <section>
        <div className={`${styles.paddingX} ${styles.flexCenter}`}>
          <div className={`${styles.boxWidth}`}>
            <Navbar />
          </div>
        </div>

        <div className={`bg-primary ${styles.flexStart}`}>
          <div className={`${styles.boxWidth}`}>
            <Hero />
          </div>
        </div>

        <div className={`bg-primary ${styles.flexCenter} ${styles.paddingX} `}>
          <div className={`${styles.boxWidth}`}>
            {/* <SkillsAndExperience /> */}

          </div>
        </div>
        {/* <Footer /> */}
      </section>
    </div>

    );
  }
}
