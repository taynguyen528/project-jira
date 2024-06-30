import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, InputRef, Space, Table } from "antd";
import { FilterConfirmProps } from "antd/es/table/interface";
import { ColumnType, ColumnsType } from "antd/lib/table";
import { useRef, useState } from "react";
import Highlighter from "react-highlight-words";
import { UserInfo, IUserTableProps } from "types";
import { formatPhoneNumber } from "utils";

export const UserTableTemplate = ({ userList }: IUserTableProps) => {
  type UserIndex = keyof UserInfo;
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<InputRef>(null);
  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    userIndex: UserIndex
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(userIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (
    userIndex: UserIndex
  ): ColumnType<UserInfo> => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={searchInput}
          placeholder={`Search ${userIndex === "userId" ? "User" : userIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            handleSearch(selectedKeys as string[], confirm, userIndex)
          }
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() =>
              handleSearch(selectedKeys as string[], confirm, userIndex)
            }
            icon={<SearchOutlined />}
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText((selectedKeys as string[])[0]);
              setSearchedColumn(userIndex);
            }}
          >
            Filter
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <div className="flex justify-center items-center">
        <SearchOutlined
          style={{ color: filtered ? "#1890ff" : undefined }}
          className="text-base"
        />
      </div>
    ),
    onFilter: (value, record) =>
      (record[userIndex] ?? "")
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === userIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  let headColumns: ColumnsType<UserInfo> = [
    {
      title: <span className="text-lg">User Name</span>,
      dataIndex: "name",
      key: "name",
      ...getColumnSearchProps("name"),
      sorter: (a, b) => b.name.localeCompare(a.name),
      sortDirections: ["descend", "ascend"],
      render: (text) => (
        <span className="projectName text-lg font-semibold cursor-pointer transition-colors duration-300">
          {text}
        </span>
      ),
    },
    {
      title: <span className="text-lg">Email</span>,
      dataIndex: "email",
      key: "email",
      render: (text) => <span className="text-base">{text}</span>,
    },
    {
      title: <span className="text-lg">User ID</span>,
      dataIndex: "userId",
      key: "userId",
      render: (text) => <span className="text-base">{text}</span>,
    },
    {
      title: <span className="text-lg">Phone Number</span>,
      dataIndex: "phoneNumber",
      key: "phoneNumber",
      render: (phone) => <span className="text-base">{formatPhoneNumber(phone)}</span>,
    },
    {
      title: <span className="text-lg">Edit</span>,
      dataIndex: "action",
      key: "action",
    },
  ];

  return (
    <Table rowKey={Math.random} columns={headColumns} dataSource={userList} />
  );
};
