import { useRouter } from "next/router";

const Footer = () => {

    const router = useRouter()

    return (
        <footer className="">
            <div className="container px-3 py-2 mx-auto">
                <div className="flex flex-col items-center text-center">
                    <div className="flex flex-col mt-4 items-center sm:flex-row sm:justify-center gap-5">
                        <a href="https://www.producthunt.com/posts/comicify-ai?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-comicify&#0045;ai" target="_blank" className=" sm_max:w-52"><img src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=404049&theme=light" alt="Comicify&#0046;ai - Transforming&#0032;dull&#0032;text&#0032;into&#0032;comic&#0032;adventures&#0033; | Product Hunt" style={{ width: "250px", height: "54px" }} width="250" height="54" /></a>
                        <a href="https://www.buymeacoffee.com/comicifyAI" target="_blank" className=" sm_max:w-52"><img src="https://img.buymeacoffee.com/button-api/?text=Buy us a coffee&emoji=&slug=comicifyAI&button_colour=4abfa8&font_colour=000000&font_family=Comic&outline_colour=000000&coffee_colour=FFDD00" /></a>
                        <button className="bg-[#00b9fe] w-48 h-[50px] rounded-lg text-white font-semibold text-lg hover:bg-[#22abdc] transition-colors duration-300 sm_max:w-52" onClick={() => window.open('https://ko-fi.com/comicifyai', '_ blank')}>
                            <img src="/assets/kofi-logo.png" className="inline w-9 mr-2" />
                            Support us
                        </button>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer;