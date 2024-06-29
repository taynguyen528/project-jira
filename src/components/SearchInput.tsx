/* import antd packages */
import { SearchOutlined } from "@ant-design/icons";

const searchInput = () => {
  return (
    <div className="search-bar relative">
      <input
        className="search-input border border-black pl-5 py-2"
        type="text"
        name="filter-task-search"
        id="filter-task-search"
      />
      <SearchOutlined className="absolute top-1/2 left-2 z-[1px] -translate-y-1/2" />
    </div>
  );
};

export default searchInput;
