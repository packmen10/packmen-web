import {createSlice} from '@reduxjs/toolkit'

const initialState={
    selectedItems:[],
    searchString:"",

}

const addItemsIntoAnInvoice= createSlice({
    name:'addItemsIntoAnInvoice',
    initialState,
    reducers:{
        addNewItem:(state,action)=>{
            state.selectedItems.push(action.payload)
        },
        editItems:(state,action)=>{
            state.selectedItems.forEach((el)=>{
                if(el.id==action.payload.id){
                    el[action.payload.key]=action.payload.value
                }
            })
        },
        removeItem:(state,action)=>{
            state.selectedItems=state.selectedItems.filter((el)=>el.id!=action.payload.id)
        },
        changeSearchString:(state,action)=>{
            state.searchString=action.payload
        },
        resetUpdatedItems:(state,action)=>{
            state.updatedItems=[]
        }
    }
})

export const {
    addNewItem,
    editItems,
    removeItem,
    changeSearchString,
    resetUpdatedItems
}=addItemsIntoAnInvoice.actions

export default addItemsIntoAnInvoice.reducer