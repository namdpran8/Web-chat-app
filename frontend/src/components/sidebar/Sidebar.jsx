import Conversations from "../../components/sidebar/Conversations"
import LogoutButton from "../../components/sidebar/LogoutButton"
import SearchInput from "../../sidebar/searchInput"

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