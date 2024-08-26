import Conversations from "./Conversations"
import LogoutButton from "./LogoutButton"
import SearchInput from "./searchInput"

function Sidebar() {
  return (
    <div className=" border-r border-slate-500 p-4 flex flex-col">

        <SearchInput />
        <Conversations />
        <LogoutButton />
        <div className="divider px-3"></div>
    </div>
  )
}

export default Sidebar