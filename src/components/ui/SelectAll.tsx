import { Button, Checkbox, CheckboxProps, Flex } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { checkedAll, selectDeleteData } from "../../store/slices/userSlice";
import { RootState } from "../../store/store";
import { Trans } from "react-i18next";

const SelectAll:React.FC = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state: RootState) => state.user);

  const onDeleteButtonUser = () => {
    dispatch(selectDeleteData(userInfo.selectData));
  };

  const onChangeSelectAll: CheckboxProps["onChange"] = (e) => {
    dispatch(checkedAll(e.target.checked));
  };
  return (
    <Flex align="center" style={{marginBottom:"1rem"}}>
      <Checkbox onChange={onChangeSelectAll}><Trans>SelectAll</Trans></Checkbox>
      <Button onClick={onDeleteButtonUser}><Trans>Delete</Trans></Button>
    </Flex>
  );
};

export default SelectAll;
