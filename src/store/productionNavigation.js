import {createSlice} from "@reduxjs/toolkit"


const initialState={
    normelField:{
        customer:true,
        work_order:false,
        bom:false,
        MIR:false,
        Machining_log:false,
        Job_card:false,
        Out_sourcing:false,
        QC:false,
        
    },
}

const productionNavigation=createSlice({
    name:'productionNavigation',
    initialState,
    reducers:{
        changeVal:(state,action)=>{
            for(let key in state.normelField){
                if(key!=action.payload.key){
                    state.normelField[key]=false
                }
            }
            state.normelField[action.payload.key]=action.payload.value
        },
    }
})

export const {changeVal}=productionNavigation.actions
export default productionNavigation.reducer