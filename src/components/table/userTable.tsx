import {  Table, TableColumnsType, TableProps } from "antd";
import "./userTable.scss";
import { RootState } from "../../store/store";
import { useDispatch, useSelector } from "react-redux";
import {  deleteData, editData, selectData } from "../../store/slices/userSlice";
import { Trans, useTranslation } from "react-i18next";
import { itemRender } from "./paginationElement";
import { DataTypeTable } from "../../@types/dataType";
import SelectAll from "../ui/SelectAll";

type TableRowSelection<T> = TableProps<T>["rowSelection"];

const UserTable: React.FC = () => {
  const {t} = useTranslation()
  const dispatch = useDispatch();
  const userInfo = useSelector((state: RootState) => state.user);

  const data = userInfo.datas.map((data:any) => ({...data,gender:t(data.gender),nationality: t(data.nationality)}))

  const columns: TableColumnsType<DataTypeTable> = [
    Table.SELECTION_COLUMN,
    {
      title: `${t("Name")}`,
      dataIndex: "fullname",
      showSorterTooltip: { target: "full-header" },
      sorter: {
        compare: (a, b) => a.fullname.length - b.fullname.length,
        multiple: 3,
        },
        },
      
    {
      title: `${t("Gender")}` ,
      dataIndex: "gender",
      sorter: {
        compare: (a, b) => a.gender.length - b.gender.length,
        multiple: 3,
      },
    },
    {
      title: `${t("Mobile")}`,
      dataIndex: "mobile",
      sorter: {
        compare: (a, b) => a.phone.length - b.phone.length,
        multiple: 3,
      },
    },
    {
      title: `${t("Nationality")}`,
      dataIndex: "nationality",
      sorter: {
        compare: (a, b) => a.nationality.length - b.nationality.length,
        multiple: 3,
      },
    },
    {
      title: `${t("Actions")}`,
      render: (id) => {
        return (
          <div className="manageButton">
            <span onClick={() => onEditHandlerUser(id)}><Trans>Edit</Trans></span>
            <span onClick={() => onDeleteHandlerUser(id)}><Trans>Delete</Trans></span>
          </div>
        );
      },
    },
  ];

  const onEditHandlerUser = (user: { id: string }) => {
    dispatch(editData(user));
  };

  const onDeleteHandlerUser = (user: { key: string }) => {
    window.alert("Delete Success")
    dispatch(deleteData(user.key));
  };

  const rowSelection: TableRowSelection<DataTypeTable> = {
    selectedRowKeys: userInfo.selectRowKeys,
    onChange: (selectedRowKeys, selectedRows) => {
      dispatch(selectData(selectedRows));
    },
  };

  return (
    <div className="userTableContainer">
      <SelectAll />
      <Table
        dataSource={data}
        columns={columns}
        rowSelection={{ ...rowSelection }}
        pagination={{ position: ["topRight"] ,itemRender:itemRender,className:'customPagination'}}
      />
    </div>
  );
};

export default UserTable;
