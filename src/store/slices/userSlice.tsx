import { createSlice } from "@reduxjs/toolkit";

const userLocal = localStorage.getItem("userData");

const initialStateUser = {
  datas: [],
  editData: null,
  statusEdit: false,
  selectData: [],
  statusCheckAll: false,
  selectRowKeys: []
};

const userSlice = createSlice({
  name: "user",
  initialState: userLocal ? JSON.parse(userLocal) : initialStateUser,
  reducers: {
    addData(state, action) {
      const selectData = state.datas.findIndex(
        (user: { key: string }) => user.key === action.payload.key
      );
      if (selectData !== -1) {
        state.datas = [...state.datas.slice(0,selectData),action.payload,...state.datas.slice(selectData+1)]
      } else {
        state.datas = state.datas.concat(action.payload);
      }
      state.editData = null;
      localStorage.setItem("userData", JSON.stringify(state));
    },
    deleteData(state, action) {
      state.datas = state.datas.filter(
        (user: any) => user.key !== action.payload
      );
      localStorage.setItem("userData", JSON.stringify(state));
    },
    selectDeleteData(state,action){
      state.datas = state.datas.filter((user:any) => !action.payload.some((item:any) => item.key === user.key));
      localStorage.setItem("userData", JSON.stringify(state));
    },
    editData(state, action) {
      state.editData = state.datas.find(
        (user: { key: string }) => user.key === action.payload.key
      );
      state.statusEdit = !state.statusEdit;
    },
    selectData(state,action){
        state.selectData = action.payload
        state.selectRowKeys = action.payload.map((user:any)=> user.key)
    },
    checkedAll(state,action){
        state.statusAllCheck = action.payload
        if(state.statusAllCheck){
          state.selectRowKeys = state.datas.map((user:{key:string}) => user.key)
          state.selectData = state.datas
        }else{
          state.selectRowKeys = []
          state.selectData = []
        }
    },
    reset(state){
      state.editData = null
    }
  },
});

export const { addData, deleteData, editData,selectData,selectDeleteData,checkedAll,reset } = userSlice.actions;
export default userSlice.reducer;
