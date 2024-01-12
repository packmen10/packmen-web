import {createSlice} from "@reduxjs/toolkit"


const initialState={
    table_or_addItems:false,
    searchItemToInvoice:""
}

const invoiceTable_items=createSlice({
    name:'invoiceTable_items',
    initialState,
    reducers:{
        manageStatus:(state,action)=>{
            state.table_or_addItems=action.payload
        }
    }
})

export const{manageStatus}=invoiceTable_items.actions
export default invoiceTable_items.reducer
