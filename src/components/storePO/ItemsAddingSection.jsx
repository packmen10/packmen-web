import React, { useState } from 'react'
import { useGetAllMirQuery, useGetPoQuery, useGetStoreItemsQuery, useUpdatePoMutation } from '../../store/apiSlice'
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@material-ui/core'
import { PoTable } from './PoTable'



const removeDuplicateObjectStrings=(array)=>{
    let newArray = [];
    let uniqueObject = {};
    for (let i in array){
      let objTitle = array[i]?.material_specification?.item
      uniqueObject[objTitle] = array[i];
    }
    for (let i in uniqueObject) {
      newArray.push(uniqueObject[i]);
    }
    return newArray
}



export const ItemsAddingSection = ({id}) => {

    const {data:poData}=useGetPoQuery(id)
    const {data:itemsData}= useGetStoreItemsQuery()
    const {data:mirData}=useGetAllMirQuery()
    const [mirItemId,setMirItems]=useState('')
    const [updatePo]=useUpdatePoMutation()



const convertStringInToItemName=(itemId)=>{
  return itemsData?.data?.find(item=>item?._id==itemId)?.name
}
    const sampleItems={
      item:"",
      bomId:"",
      mirId:"",
      quantity:""
    }

    const[selectedMirItems,setItems]=useState(sampleItems)

    const handlSelectItemFromMir=(mir)=>{
      const modiFyMir=JSON.parse(mir)
      const itemsBomMir={item:modiFyMir?.material_specification?.item,bomId:modiFyMir?.bom,mirId:modiFyMir?._id}
      setItems(itemsBomMir)
    }

    const handleCancel =()=>{
      setItems(sampleItems)
     }

     const handleUpdateItems=()=>{
        for(let key in  selectedMirItems){
          if(selectedMirItems[key]=='') return
        }
        updatePo({id,items:[...poData?.data?.items,selectedMirItems]})
        handleCancel()
     }

  return (
    <div className='ItemsAddingSection'>
        <div className="items-adding-section flex align-cen column" >
          <div className="selection-section flex" style={{maxWidth:'40vw',width:'100%',gap:'5px',border:'1px solid #e7dada',padding:'15px 5px',borderRadius:'5px'}} >
           <FormControl style={{width:'100%'}} variant="standard" sx={{ m: 1, minWidth: 120 }}>
<InputLabel id="demo-simple-select-standard-label">MIR no</InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={mirItemId}
                  onChange={(e)=>setMirItems(e.target.value)}
                  label="Age" >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {
                  mirData?.data?.map(mir=>{
                    return <MenuItem value={mir?._id}>{mir?.mir_no}</MenuItem>
                  })
                }
                </Select>
            </FormControl>
            <FormControl style={{width:'100%'}} variant="standard" sx={{ m:1,minWidth:120}}>
                <InputLabel id="demo-simple-select-standard-label">items</InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={convertStringInToItemName(selectedMirItems?.item)}
                  onChange={(e)=>handlSelectItemFromMir(e.target.value)}
                  label="Age">
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                  {(()=>{
                    const mirItemsArray=mirData?.data?.find(mir=> mir?._id==mirItemId )?.mir_items
                    return removeDuplicateObjectStrings(mirItemsArray)?.map(itemName=>{
                      return <MenuItem value={JSON?.stringify(itemName)}>{convertStringInToItemName(itemName?.material_specification?.item)}</MenuItem>
                    })
                  })()}
                </Select>
            </FormControl>
            <TextField style={{width:'100%'}} value={selectedMirItems?.quantity} type='number' label='Quantity' onChange={(e)=>setItems(pre=> ({...pre,quantity: +e?.target?.value}))} />
          </div>
          <div className="btn_section_po" style={{padding:'10px 0'}}>
             <Button onClick={handleUpdateItems} style={{textTransform:'none'}}>Add</Button>
             <Button onClick={handleCancel} style={{textTransform:'none'}}>Cancel</Button>
          </div>
          <div className="mir_items_detailes">
            <PoTable id={id} itemNamecb={convertStringInToItemName}/>
          </div>
        </div>
        <div className="updating-section">

        </div>
    </div>
  )
}
