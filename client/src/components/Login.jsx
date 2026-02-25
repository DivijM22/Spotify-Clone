import spotifyLogo from "../assets/spotifyLogo.png"
import "./Login.css"

export default function Login(props)
{
    
    return(
        <div className="flex flex-col items-center min-h-screen w-screen">
            <nav className="bg-black w-screen flex items-center h-[14vh] px-[9.5%]">
                <img className="h-[65%] text-white" src={spotifyLogo} alt="Spotify Logo" />
            </nav>
            <div className="flex flex-col justify-center items-center flex-1 w-[100%] bg-[#2941AB] gap-12">
                <div className="flex flex-col text-[6rem] font-bold text-[#1ED760] montserrat-800 leading-[1.2] w-[57%]">
                    <div>
                        Listening is
                    </div>
                    <div className="text-right pr-[10%]">everything</div>
                </div>
                <div className="flex text-xl montserrat-500 text-[#1ED760]">
                    Millions of songs and podcasts
                </div>
                <div className="flex">
                    <button onClick={(e)=>{props.onClick()}} className="flex text-[1.5rem] justify-center items-center montserrat-500 bg-white text-[#1ED760] px-[15%] py-[7%] rounded-lg font-bold">Login</button>
                </div>
            </div>
        </div>
    );
}