import React, { useState } from 'react'

import { useCreateStoreItemMutation, useGetStoreItemsQuery, useGetStoreRightCreateTextQuery } from '../../store/apiSlice'
import { EditDeleteItems } from './EditDeleteItems'
import DataTable from '../othreComponents/DataTable'
import { Button, TextField } from '@material-ui/core'
import { removingUnderscoore } from '../../costoumHoks/removingUnderscoore'
import useUpperFirstLetter from '../../costoumHoks/useUpperFirstLetter'
import { initialStoreData } from '../../store/itemsData'

export const AllItems = () => {
   
   const {data:itemsText}=useGetStoreRightCreateTextQuery()
   console.log(itemsText)

   const tableTitile=itemsText?.data?.filter((el)=>el.name=='name'||el.name=='category'||el.name=='hsn_code').map(el=>el.name) || []
   //console.log(tableTitile)

   const{data:storeAllItems}=useGetStoreItemsQuery()
   const[createStoreItem]=useCreateStoreItemMutation()
   const [newStoreItems,setStoreItems]=useState({...initialStoreData})

   const handileCreate=()=>{
      console.log(newStoreItems)
      for(let key in newStoreItems){               
         if(newStoreItems[key]=='' && key!='stock') return
      }                              
      createStoreItem(newStoreItems)
      handileCancel()
   }

   const handileCancel=()=>{
      setStoreItems(initialStoreData)
   }
   const handileTextField=(text,field)=>{
      setStoreItems(pre=> ({...pre,[field.name]:field.type=='text' ? text : +text} ))
   }
   
   const btnStyle={
      width:'100%',
      textTransform:'none',
      height:'50px'
   }
        return (
         <div className="allitems flex ">
            <div className="container-all-items" >
               <DataTable tHead={['No',...tableTitile]}  dataField={storeAllItems?.data} DataItemsCmp={EditDeleteItems}/>
            </div>
            <div style={{maxWidth:'20vw',width:'100%'}}>
            <div className="rightCreateSection flex" >
               <h3 style={{color:'#347dac',paddingBottom:'20px'}}>Create new item</h3>
               {
                  itemsText?.data?.map(fieldItems=>{
                     if(fieldItems.name!='stock')
                        return  <TextField
                        value={newStoreItems[fieldItems.name]}
                        onChange={(e)=>handileTextField(e.target.value,fieldItems)}
                        id="standard-basic"
                        InputLabelProps={{ shrink: true, required: true }}
                        label={removingUnderscoore(useUpperFirstLetter(fieldItems?.name))}
                        type={fieldItems?.type}
                        variant="standard" />
                  })
               }
               <div className="btns flex justify-cen" style={{gap:"5px",paddingTop:"20px"}}>
                  <Button style={btnStyle} onClick={handileCreate} variant="text">Create</Button>
                  <Button style={btnStyle} onClick={handileCancel} variant="text">Cancel</Button>
               </div>
            </div>
            </div>
         </div>
       )
}
