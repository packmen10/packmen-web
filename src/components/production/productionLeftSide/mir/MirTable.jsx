import React, { useState } from 'react'
import {  useGetAllWorkOrderNoQuery, useGetMirByIdQuery,  useGetStoreItemsQuery, useUpdateMirMutation, } from '../../../../store/apiSlice'
import { removingUnderscoore } from '../../../../costoumHoks/removingUnderscoore'
import useUpperFirstLetter from '../../../../costoumHoks/useUpperFirstLetter'
import { Button } from '@material-ui/core'
import { FaDeleteLeft } from "react-icons/fa6";


export const MirTable = ({id}) => {
  const{data:storeItemsData}=useGetStoreItemsQuery()
  const{data:workOrderNos}=useGetAllWorkOrderNoQuery()
  const{data:mir}=useGetMirByIdQuery(id)

  const[updateMir]=useUpdateMirMutation()

  const [quantityData,setQuantity]= useState([])

  const header=['no','work_order_no','section','part_no','item','quantity']

  const getWorkNo=(id)=>{
   return workOrderNos?.data?.find((workNo)=> workNo?._id==id)?.work_no
  }

  const getStoreItem=(id)=>{
    return storeItemsData?.data?.find(item=> item?._id==id)?.name
  }

  /*updating mir items in the mir documents*/
  const handleChange=(e,mirItem)=>{
    if(quantityData?.some(mirQuan=> mirQuan?._id==mirItem?._id)){
        setQuantity(pre=>{
           return pre?.map(mirI=>{
             if(mirI?._id==mirItem?._id){
                return {
                    ...mirI,
                    material_specification:{
                      ...mirI?.material_specification,
                      quantity:e?.target?.value
                    }
                }
             }else{
               return mirI
             }
           })
        })
    return
    }
    
    setQuantity(pre=>[...pre ,{
      ...mirItem,
      material_specification:{
        ...mirItem?.material_specification,
        quantity:e?.target?.value
      }
    }])
  }

  const handleChanges=()=>{
    if(quantityData?.length>0){
     const updated_material_specification = mir?.data?.mir_items?.map(mir_speci=>{
        if(quantityData?.some(quan=> quan?._id==mir_speci?._id)){
          return quantityData?.find(quan=> quan?._id==mir_speci?._id)
        }else{
          return mir_speci
        }
      })
      updateMir({id,mir_items:updated_material_specification})
      setQuantity([])
    }
  }

  const handleDeleteItems=(mirItemsId)=>{
    updateMir({id,mir_items: mir?.data?.mir_items?.filter(item=> item?._id!=mirItemsId)})
  }

  return (
    <div className="mir_table_section">
        <table style={{width:'100%'}}>
            <thead>
                <tr>
                  {
                    header?.map(titile=>{
                      return <td>{removingUnderscoore(useUpperFirstLetter(titile))}</td>
                    })
                  }
                </tr>
            </thead>
            <tbody>
                {
                  mir?.data?.mir_items?.map((mirItem,i)=>{
                    return <tr>
                      <td>{i+1}</td>
                      <td>{getWorkNo(mirItem?.work_no)}</td>
                      <td>{mirItem?.section}</td>
                      <td>{mirItem?.part_no}</td>
                      <td>{getStoreItem(mirItem?.material_specification?.item)}</td>
                      <td className='flex justify-cen' style={{gap:'10px'}} ><input type='number'
                      value={quantityData?.find(mir=> mir?._id==mirItem?._id)?.material_specification?.quantity ||
                         quantityData?.find(mir=> mir?._id==mirItem?._id)?.material_specification?.quantity=='' ?
                         quantityData?.find(mir=> mir?._id==mirItem?._id)?.material_specification?.quantity :
                          mirItem?.material_specification?.quantity }
                      onChange={(e)=>handleChange(e,mirItem)}
                      style={{height:'100%',maxWidth:'60px',width:'100%',outline:'none',border:'none',borderBottom:'1px solid black' }}
                      /><button onClick={()=>handleDeleteItems(mirItem?._id)} style={{backgroundColor:'white',color:'black',border:'none',cursor:'pointer'}}><FaDeleteLeft style={{fontSize:'23px',color:'#676767'}}/></button> </td>
                      
                    </tr>
                  })
                }
            </tbody>
        </table>
        {quantityData?.length>0 && (<Button  style={{
          textTransform:'none',
        }} onClick={handleChanges}>Save Changes</Button>)}
    </div>
  )
}
