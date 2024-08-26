import Conversations from "./Conversations"
import SearchInput from "./searchInput"

function Sidebar() {
  return (
    <div>

        <SearchInput />
        <Conversations />
        <div className="divider px-3"></div>
    </div>
  )
}

export default Sidebar