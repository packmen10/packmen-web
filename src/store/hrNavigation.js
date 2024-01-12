import { createSlice } from "@reduxjs/toolkit";

const initialState={
    status:{
        employee:true,
        other:false
    }
}

const hrNvaigation=createSlice({
    name:'hrNva',
    initialState,
    reducers:{
        onClickChangeHrNav:(state,action)=>{
            for(let key in state.status){
                state.status[key]=false
            }
            state.status[action.payload.key]=true
        }
    }
})

export const {onClickChangeHrNav}=hrNvaigation.actions
export default hrNvaigation.reducer