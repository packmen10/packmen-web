import {createSlice} from "@reduxjs/toolkit"

export const initialStoreData={
    "name": "",
    "category": "",
    "sub_category": "",
    "hsn_code": "",
    "description": "",
    "cost_price": "",
    "unit": "",
    "minimum_stock": "",
    "location": "",
    "tax": "",
    "stock":0,
    "sl_no":''
}

const initialState={
    storeData:initialStoreData
}

const itemsData=createSlice({
    name:"storedata",
    initialState,
    reducers:{
        setStoreData:(state,action)=>{
            const checkData=["hsn code","part no","cost price","unit","minimum stock","tax"]
            if(checkData.find((item)=>item==action.payload.field)){
                state.storeData[action.payload.field] =+ action.payload.data
            }else{
                state.storeData[action.payload.field] = action.payload.data
            }
        },
        resetStoreData:(state,action)=>{
            state.storeData=action.payload
        }
    }
})

export const{setStoreData,resetStoreData}=itemsData.actions
export default itemsData.reducer