import React, {useState} from 'react'
import { useDeleteStoreItemMutation, useGetStoreItemQuery, useGetStoreRightCreateTextQuery, useUpdateStoreItemMutation } from '../../store/apiSlice'
import useUpperFirstLetter from '../../costoumHoks/useUpperFirstLetter'
import { removingUnderscoore } from '../../costoumHoks/removingUnderscoore'
import { Button, TextField } from '@material-ui/core'


export const EditDeleteItems = ({id}) => {

  const {data:itemData,isLoading}=useGetStoreItemQuery(id)
  const{data:itemTitileTextData,isLoading:loadingAllItemsText}=useGetStoreRightCreateTextQuery()

  const[deleteItems]=useDeleteStoreItemMutation()
  const [isEditOption,setEditOption]=useState(false)
  const[updatedItems,updateItems]=useState(itemData?.data)

  const[updateItem]=useUpdateStoreItemMutation()
  const[updatedItemsCnt,setUpdatedItemsCnt]=useState({id:itemData?.data?._id})

  const handleDelete=()=>{
   deleteItems(id)
   changeFun(null)
  }

  const handleUpdate=()=>{
     if(isEditOption){
       const statusFunc=()=>{
         for(let key in updatedItemsCnt){
             if(updatedItemsCnt[key]==' ' ||updatedItemsCnt[key]==''){
               return false
             }
         }
         return true
       }
       if(statusFunc()){
        setEditOption(false) 
        updateItem(updatedItemsCnt)
       }
     }else{
       setEditOption(true)
     }
  }

   const handleUpdateData=(type,val,key)=>{
        updateItems(pre=>({...pre,[key]:type=='number'? val? +val:' ' :val?val:' '}))
        setUpdatedItemsCnt(pre=>({...pre,[key]:val}))
   }
   const getType=(key)=>{
    return itemTitileTextData?.data?.find((el)=>el.name==key)
   }

   const getElements=()=>{
        let elements=[]
        let i=0
        for(let key in updatedItems){
            if(key!='__v'&&key!='_id'&&key!='id'){
              elements.push(            
                <div key={key*34} className={`input-label-field ${key}`}>
                 <TextField
                    style={{width:"100%"}}
                    id="filled-basic"
                    label={useUpperFirstLetter(removingUnderscoore(key))}
                    variant="standard"
                    InputLabelProps={{ shrink: true, required: true }}
                    onChange={(e)=> key!='stock'&& handleUpdateData(e.target.type,e.target.value,key)} 
                    disabled={!isEditOption}
                    type={getType(key)?.type}
                    value={updatedItems[key]}
                    />
                </div>)
                  i++
            }
        }
        return elements
    }
       return (
        <div className='editoption'>
            <div className="detailes">
                {getElements()}
            </div>
            <div className="options-btns">
                <Button style={{textTransform:'none'}}  className='delte-option' onClick={()=>handleDelete()} >Delete</Button>
                <Button style={{textTransform:'none'}}  className='edit-option' onClick={handleUpdate} >{`${isEditOption?'Save':'Edit'}`}</Button>
            </div>
        </div>
      )
}
