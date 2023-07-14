import Link from "next/link";
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { supabase } from "@/utils/supabase";

export default function SignUp() {

    const router = useRouter()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [samePassword, setSamePassword] = useState(true)
    const [isValidEmail, setIsValidEmail] = useState(true)

    const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/

    const handleSignUp = async () => {

        if (confirmPassword == password && emailRegex.test(email)) {

            setSamePassword(true)

            const { data, error } = await supabase.auth.signUp({
                email,
                password,
            })
            console.log(data, error)
            router.push("/")

        } else if (confirmPassword != password) {
            setSamePassword(false)
            return;
        } else {
            setIsValidEmail(false)
            return;
        }
    }

    const confirmPasswordHandler = (value) => {
        setConfirmPassword(value)

        if (value == password) {
            setSamePassword(true)
        }
    }

    const emailChangeHandler = (value) => {
        setEmail(value)

        if (emailRegex.test(value)){
            setIsValidEmail(true)
        }
    }

    return (
        <div className="min-h-[80vh] flex items-center">
            <div className="flex w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800 lg:max-w-4xl h-fit">
                <div className="hidden bg-cover lg:block lg:w-1/2" style={{ backgroundImage: "url('https://images.pexels.com/photos/6654173/pexels-photo-6654173.jpeg?auto=compress&cs=tinysrgb&w=1600')" }}></div>
                <section className="bg-white dark:bg-gray-900 w-full p-5">
                    <div className="container flex items-center justify-center px-6 mx-auto">
                        <form className="w-full max-w-md" onSubmit="return false">
                            <div className="flex justify-center mx-auto">
                                <img className="w-auto h-24" src="/assets/comicify_ai.png" alt="" />
                            </div>
                            {/* <Link href="#" className="w-1/3 pb-2 font-medium text-center text-gray-800 capitalize border-b-2 border-blue-500 dark:border-blue-400 dark:text-white">
                                sign up
                            </Link> */}
                            <button className="w-full flex items-center justify-center mt-4 text-gray-600 transition-colors duration-300 transform border rounded-lg dark:border-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <div className="px-4 py-2">
                                    <svg className="w-6 h-6" viewBox="0 0 40 40">
                                        <path d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.045 27.2142 24.3525 30 20 30C14.4775 30 10 25.5225 10 20C10 14.4775 14.4775 9.99999 20 9.99999C22.5492 9.99999 24.8683 10.9617 26.6342 12.5325L31.3483 7.81833C28.3717 5.04416 24.39 3.33333 20 3.33333C10.7958 3.33333 3.33335 10.7958 3.33335 20C3.33335 29.2042 10.7958 36.6667 20 36.6667C29.2042 36.6667 36.6667 29.2042 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z" fill="#FFC107" />
                                        <path d="M5.25497 12.2425L10.7308 16.2583C12.2125 12.59 15.8008 9.99999 20 9.99999C22.5491 9.99999 24.8683 10.9617 26.6341 12.5325L31.3483 7.81833C28.3716 5.04416 24.39 3.33333 20 3.33333C13.5983 3.33333 8.04663 6.94749 5.25497 12.2425Z" fill="#FF3D00" />
                                        <path d="M20 36.6667C24.305 36.6667 28.2167 35.0192 31.1742 32.34L26.0159 27.975C24.3425 29.2425 22.2625 30 20 30C15.665 30 11.9842 27.2359 10.5975 23.3784L5.16254 27.5659C7.92087 32.9634 13.5225 36.6667 20 36.6667Z" fill="#4CAF50" />
                                        <path d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.7592 25.1975 27.56 26.805 26.0133 27.9758C26.0142 27.975 26.015 27.975 26.0158 27.9742L31.1742 32.3392C30.8092 32.6708 36.6667 28.3333 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z" fill="#1976D2" />
                                    </svg>
                                </div>

                                <span className="w-5/6 px-4 py-3 font-bold text-center">Sign up with Google</span>
                            </button>
                            <div className="flex items-center justify-between mt-4">
                                <span className="w-1/5 border-b dark:border-gray-600 lg:w-1/4"></span>

                                <a href="#" className="text-xs text-center text-gray-500 uppercase dark:text-gray-400 hover:underline">or signup
                                    with email
                                </a>

                                <span className="w-1/5 border-b dark:border-gray-400 lg:w-1/4"></span>
                            </div>
                            <div className="relative flex items-center mt-6">
                                <span className="absolute">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </span>

                                <input type="email" onChange={(e) => emailChangeHandler(e.target.value)} className={`block w-full py-3 text-gray-700 bg-white border ${isValidEmail ? `` : `border-red-500`} rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40`} placeholder="Email address" />
                            </div>

                            <div className="relative flex items-center mt-4">
                                <span className="absolute">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                </span>

                                <input type="password" onChange={(e) => setPassword(e.target.value)} className="block w-full px-10 py-3 text-gray-700 bg-white border rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" placeholder="Password" />
                            </div>

                            <div className="relative flex flex-col items-center mt-4">
                                <div className="relative flex items-center w-full">
                                    <span className="absolute">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                        </svg>
                                    </span>

                                    <input type="password" onChange={(e) => confirmPasswordHandler(e.target.value)} className={`block w-full px-10 py-3 text-gray-700 bg-white border ${samePassword ? `mb-4` : `border-red-500`} rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40`} placeholder="Confirm Password" />
                                </div>

                                {samePassword ? <p className="text-red-500 text-xs italic">{" "}</p> : <p className="text-red-500 text-xs italic">Passwords don't match</p>}
                            </div>
                            <div className="mt-6">
                                <button type="button" onClick={() => handleSignUp()} className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-gray-800 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50">
                                    Sign Up
                                </button>
                                <div className="mt-6 text-center ">
                                    <Link href="/auth/login" className="text-xs text-gray-500 uppercase dark:text-gray-400 hover:underline font-semibold">
                                        Already have an account?
                                    </Link>
                                </div>
                            </div>
                        </form>
                    </div>
                </section>
            </div>
        </div>
    )
}