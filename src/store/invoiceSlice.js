import {createSlice} from "@reduxjs/toolkit"

export const invoiceItem={
    sellers:"",
    invoice_date:"",
    invoice_no:"",
    po_number:"",
    po_date:'',
    dispathced_through:'',
    destination:'',
    isCreated:false,
    items:[]
}

const initialState={
    invoiceItem
}

const invoiceSlice=createSlice({
    name:"select",
    initialState,
    reducers:{
        addNeItem:(state,action)=>{
            state.invoiceItem.items=[...state.invoiceItem.items,...action.payload]
        },
        removeEl:(state,action)=>{
            state.invoiceItem.items=state.invoiceItem.items.filter((item)=>item.itemsid!=action.payload)
        },
        addFields:(state,action)=>{
            state.invoiceItem[action.payload.field]=action.payload.val
        },
        cancelUdatedState:(state,action)=>{
            state.invoiceItem=action.payload
        },
        changeTheQuantity:(state,action)=>{
            state.invoiceItem.items.forEach((item)=>{
                if(item.id==action.payload.id){
                    item[action.payload.property]=+action.payload[action.payload.property]
                }
            })
        },
    }
})

export const{addNeItem,removeEl,addFields,cancelUdatedState,changeTheQuantity}=invoiceSlice.actions
export default invoiceSlice.reducer