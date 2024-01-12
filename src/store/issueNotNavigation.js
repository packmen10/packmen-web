import {createSlice} from "@reduxjs/toolkit"

const initialState={
    issueNotDetail:null
}

const issueNotNavigation=createSlice({
    name:'issueNotNavigation',
    initialState,
    reducers:{
        setIssueNotStatus:(state,action)=>{
            state.issueNotDetail = action.payload
        }
    }
})

export const {setIssueNotStatus}=issueNotNavigation.actions
export default issueNotNavigation.reducer