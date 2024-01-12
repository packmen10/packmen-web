import React from 'react'
import {  useGetAllWorkOrderNoQuery, useGetMirByIdQuery,  useGetOutSourceQuery,  useGetStoreItemsQuery, } from '../../../../store/apiSlice'
import { removingUnderscoore } from '../../../../costoumHoks/removingUnderscoore'
import useUpperFirstLetter from '../../../../costoumHoks/useUpperFirstLetter'
import { FormControl, InputLabel, MenuItem, Select, TextField } from '@material-ui/core'

export const OutSourceTable = ({id}) => {
  const{data:storeItemsData}=useGetStoreItemsQuery()
  const{data:workOrderNos}=useGetAllWorkOrderNoQuery()
  const{data:outSource}= useGetOutSourceQuery(id)

  const header=['no','section','part_no','item','quantity','price','status']

  const getWorkNo=(id)=>{
   return workOrderNos?.data?.find((workNo)=> workNo?._id==id)?.work_no
  }

  const getStoreItem=(id)=>{
    return storeItemsData?.data?.find(item=> item?._id==id)?.name
  }

  return(
    <div className="mir_table_section" style={{
        width:'100%',
    }}>
        <table style={{width:'100%'}}>
            <thead>
                <tr>
                  {
                    header?.map(titile=>{
                      return < td style={{background:'#347dac',color:'white',borderRadius:'5px'}} >{removingUnderscoore(useUpperFirstLetter(titile))}</td>
                    })
                  }
                </tr>
            </thead>
            <tbody>
                {
                  outSource?.data?.out_source_items?.map((mirItem,i)=>{
                    return <tr>
                      <td>{i+1}</td>
                      <td>{mirItem?.section}</td>
                      <td>{mirItem?.part_no}</td>
                      <td>{getStoreItem(mirItem?.material_specification?.item)}</td>
                      <td style={{position:'relative'}}><input style={{position:'absolute',bottom:'7px',left:'0', width:'100%',border:'none',borderBottom:'1px solid black',padding:'5px 0',outline:'none'}} value={mirItem?.material_specification?.quantity} /></td>
                      <td style={{position:'relative'}}><input style={{position:'absolute',bottom:'7px',left:'0', width:'100%',border:'none',borderBottom:'1px solid black',padding:'5px 0',outline:'none'}} value={mirItem?.material_specification?.price} /> </td>
                      <td>
                     <FormControl fullWidth>
                        <Select labelId="demo-simple-select-label"
                           id="demo-simple-select"
                           value={mirItem?.material_specification?.status} 
                           label="Status"
                           /* onChange={handleChange} */>

                           <MenuItem value='On going'>On going</MenuItem>
                           <MenuItem value='Pending'>Pending</MenuItem>
                           <MenuItem value='Complete'>Complete</MenuItem>
                         </Select>
                     </FormControl>
                      </td>
                    </tr>
                  })
                }
            </tbody>
        </table>
    </div>
  )
}
