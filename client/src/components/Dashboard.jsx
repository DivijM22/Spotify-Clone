import searchLogo from "../assets/search.png"
import spotifyIcon from "../assets/spotifyLogo.png"

export default function Dashboard(props)
{
    function handleChange(e)
    {
        const {value}=e.target;
        props.onSearch(value);
    }

    return (
        <div className="flex flex-col items-center min-h-screen w-screen items-start bg-[#262626]">
            <nav className="flex items-center justify-start w-full h-[10vh] bg-black px-[5%]">
                <img className="flex h-[60%]" src={spotifyIcon} alt="" />
                <div className="flex w-full justify-center items-center h-full">
                    <div className="flex justify-center gap-[12%] w-[30%] bg-zinc-800 h-[50%] rounded-xl px-[2%] py-[0.5%]">
                        <input onChange={handleChange} value={props.searchText} style={{"outline" : "none"}} type="text" className="flex text-white flex-1 bg-transparent ml-[2%]" placeholder="What do you want to listen to"/>
                        <img src={searchLogo} alt="" />
                    </div>
                </div>
                <button onClick={()=>props.onLogout()} className="flex bg-white items-center px-2 py-1 rounded-xl border">Logout</button>
            </nav>

            <div className="w-[90%] mt-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8 place-items-center pb-[10%]">
                {
                    props.searchItems.map((it,index)=>{
                        return (
                        <div 
                        key={index} 
                        className="flex h-full justify-center flex-col items-center bg-[#333] rounded-xl p-4 w-[180px] hover:bg-[#444] transition-all duration-200 cursor-pointer"
                        >
                            <img className="rounded-lg mb-3 w-full aspect-square object-cover shadow-lg" src={it.album.images[1].url} alt="Img" />
                            <div className="w-full text-center truncate text-white font-extrabold">{it.name}</div>
                            <div className="w-full text-center truncate text-white font-sm">{it.album.name}</div>
                            <div className="text-center text-slate-500">{it.artists[0].name}</div>
                        </div>);
                    })
                }
            </div>

        </div>
    );
}