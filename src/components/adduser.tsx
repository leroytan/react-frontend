import { useEffect, useState } from "react";
import { Space, Switch, Table, Tag, Transfer } from "antd";
import type {
  GetProp,
  TableColumnsType,
  TableProps,
  TransferProps,
} from "antd";
import difference from "lodash/difference";
import { useFetch } from "../useFetch";
import { User } from "../types/user";
import { useParams } from "react-router-dom";
import { TransferDirection } from "antd/es/transfer";

//Code adapted from antd official doc
type TransferItem = GetProp<TransferProps, "dataSource">[number];
type TableRowSelection<T extends object> = TableProps<T>["rowSelection"];

interface RecordType {
  key: string;
  title: string;
  description: string;
  tag: string;
}

interface DataType {
  key: string;
  title: string;
  description: string;
  tag: string;
}

interface TableTransferProps extends TransferProps<TransferItem> {
  dataSource: DataType[];
  leftColumns: TableColumnsType<DataType>;
  rightColumns: TableColumnsType<DataType>;
}

// Customize Table Transfer
const TableTransfer = ({
  leftColumns,
  rightColumns,
  ...restProps
}: TableTransferProps) => (
  <Transfer {...restProps}>
    {({
      direction,
      filteredItems,
      onItemSelectAll,
      onItemSelect,
      selectedKeys: listSelectedKeys,
      disabled: listDisabled,
    }) => {
      const columns = direction === "left" ? leftColumns : rightColumns;

      const rowSelection: TableRowSelection<TransferItem> = {
        getCheckboxProps: (item) => ({
          disabled: listDisabled || item.disabled,
        }),
        onSelectAll(selected, selectedRows) {
          const treeSelectedKeys = selectedRows
            .filter((item) => !item.disabled)
            .map(({ key }) => key);
          const diffKeys = selected
            ? difference(treeSelectedKeys, listSelectedKeys)
            : difference(listSelectedKeys, treeSelectedKeys);
          onItemSelectAll(diffKeys as string[], selected);
        },
        onSelect({ key }, selected) {
          onItemSelect(key as string, selected);
        },
        selectedRowKeys: listSelectedKeys,
      };

      return (
        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={filteredItems}
          size="small"
          style={{ pointerEvents: listDisabled ? "none" : undefined }}
          onRow={({ key, disabled: itemDisabled }) => ({
            onClick: () => {
              if (itemDisabled || listDisabled) return;
              onItemSelect(
                key as string,
                !listSelectedKeys.includes(key as string)
              );
            },
          })}
        />
      );
    }}
  </Transfer>
);

const mockTags = ["student"];

const leftTableColumns: TableColumnsType<DataType> = [
  {
    dataIndex: "title",
    title: "ID",
  },

  {
    dataIndex: "description",
    title: "Username",
  },
  {
    dataIndex: "tag",
    title: "Tag",
    render: (tag) => <Tag>{tag}</Tag>,
  },
];

const rightTableColumns: TableColumnsType<DataType> = [
  {
    dataIndex: "title",
    title: "ID",
  },

  {
    dataIndex: "description",
    title: "Username",
  },
  {
    dataIndex: "tag",
    title: "Tag",
    render: (tag) => <Tag>{tag}</Tag>,
  },
];
export function isUserincourse(userid: number, usersincourse: User[]) {
  for (let j = 0; j < usersincourse.length; j = j + 1) {
    if (userid === usersincourse[j].ID) {
      return true;
    }
  }
  return false;
}
const Adduser = () => {
  const { courseid } = useParams();
  const {
    data: allusers,
    isPending,
    error,
  } = useFetch(process.env.REACT_APP_API_KEY+"/api/admin/users", 0);
  const {
    data: courseusers,
    isPending: pending2,
    error: error2,
  } = useFetch(
    "/api/admin/courses/" + courseid + "/getusers",
    0
  );
  const [users, setUsers] = useState<User[]>();
  const mockData: RecordType[] = users
    ? users.map((user, index) => ({
        key: index.toString(),
        title: user.ID.toString(),
        description: user.Username,
        tag: mockTags[0],
      }))
    : [];
  const [targetKeys, setTargetKeys] = useState<string[]>([]);
  const [showSearch, setShowSearch] = useState(false);

  const onChange = (
    nextTargetKeys: string[],
    direction: TransferDirection,
    moveKeys: string[]
  ) => {
    const userids = mockData.filter((item) => moveKeys.includes(item.key)).map((item)=>Number(item.title));
    if (direction === "right") {
      fetch(process.env.REACT_APP_API_KEY+"/api/admin/courses/:courseid/addtocourse", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({userids:userids, courseid:Number(courseid)}),
        credentials: "include",
      }).then((response) => {
        if (response.ok) {
          setTargetKeys(nextTargetKeys);
        }
      });
    } else if (direction === "left") {
      fetch(process.env.REACT_APP_API_KEY+"/api/admin/courses/:courseid/removefromcourse", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({userids:userids, courseid:Number(courseid)}),
        credentials: "include",
      }).then((response) => {
        if (response.ok) {
          setTargetKeys(nextTargetKeys);
        }
      });
    }
  };

  const triggerShowSearch = (checked: boolean) => {
    setShowSearch(checked);
  };

  useEffect(() => {
    if (allusers.users) {
      setUsers(allusers.users);
    }
  }, [allusers]);
  useEffect(() => {
    setTargetKeys(
      mockData
        .filter((item) => isUserincourse(Number(item.title), courseusers.users))
        .map((item) => item.key)
    );
  }, [users]);

  return (
    <>
    {users&&
      <><TableTransfer
          dataSource={mockData}
          targetKeys={targetKeys}
          showSearch={showSearch}
          onChange={onChange}
          filterOption={(inputValue, item) => item.title!.indexOf(inputValue) !== -1 ||
            item.description.indexOf(inputValue) !== -1 ||
            item.tag.indexOf(inputValue) !== -1}
          leftColumns={leftTableColumns}
          rightColumns={rightTableColumns} /><Space style={{ marginTop: 16 }}>
            <Switch
              unCheckedChildren="showSearch"
              checkedChildren="showSearch"
              checked={showSearch}
              onChange={triggerShowSearch} />
          </Space></>}
    </>
  );
};

export default Adduser;
