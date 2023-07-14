import "@/styles/globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Analytics } from '@vercel/analytics/react';
import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabase";

export default function App({ Component, pageProps }) {

  const [user, setUser] = useState(null)

  const onAuthStateChange = async() => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      
      setUser(user);
      console.log(user);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    onAuthStateChange()
  },[])

  return (
    <>
      <Navbar user={user}/>
      <Component {...pageProps} />
      <Analytics />
      <Footer />
    </>
  );
}
