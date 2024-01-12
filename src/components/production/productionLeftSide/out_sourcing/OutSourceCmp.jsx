import React, { useState } from 'react'
import removeDuplicates from '../../../../costoumHoks/removeDuplicateFromArray';
import { useAddNewMirMutation, useGetAllBomQuery, useGetAllWorkOrderNoQuery, useGetOutSourceQuery, useGetStoreItemsQuery,useUpdateOutSourceMutation } from '../../../../store/apiSlice';
import { Button, FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
import { MirTable } from '../mir/MirTable';
import { OutSourceTable } from './OutSourceTable';

export const OutSourceCmp = ({id}) => {
  
    const{data:bomData}=useGetAllBomQuery()
    const{data:workOrderNoData}=useGetAllWorkOrderNoQuery()
    const[addNewMir]=useAddNewMirMutation()
    const{data:storeData}=useGetStoreItemsQuery()
    const {data:outSourceD}=useGetOutSourceQuery(id)
    const[updateOutSource]=useUpdateOutSourceMutation()
    const defualtField={
      section:'',
      part_no:'',
      material_specification:{
          item:'',
          quantity:1,
          price:0,
          status:'On going'
      },
      bom:''
    }

    //mir data state
    const [selectedField,setField]=useState(defualtField)
    console.log(selectedField)

    //state for after selecting matirial specification
    const[itemFromBom,setItem]= useState('')
    //update selectedField state when a change is hapen on the select
    
    const handleChange=(key,val)=>{
    /*cheking whether key is material_specification if it is true*/
        if(key=='material_specification'){
          const bom=bomData?.data?.find((bom)=>{
            return bom?.material_specification?.some(speci=> speci?._id==val)
          })
          const bomSpeci=bom?.material_specification?.find(speci=>speci?._id==val)
          setField(pre=>({
            ...pre,
            [key]:{ ...pre[key],item:bomSpeci?.item},
            bom:bom?._id
          }))
          setItem(val)
          return
        }
        setField((pre)=>({
          ...pre,
          [key]:val
        }));
    };

    const getWorkOrderNo=(work_id)=>{
        return workOrderNoData?.data?.find((no)=>no?._id==work_id)?.work_no  
    }

    const getStoreItem=(storeIid)=>{
        return storeData?.data?.find((storeItem)=> storeIid==storeItem?._id)?.name
    }
    
    const handleClick=()=>{
      //cheking if eny property in the selectedField has emty value or not
        for(let key in selectedField){
          if(selectedField[key]?.material_specification){
            for(let keyOne in selectedField[key]?.material_specification){
              if(selectedField[key]?.material_specification[keyOne]==''||selectedField[key]?.meterial_specification[keyOne==0]) return
            }
          }
          if(selectedField[key]=='') return
        }

        //updating db
        updateOutSource({id,out_source_items:[...outSourceD?.data?.out_source_items,selectedField]})
        setField(defualtField)
    }   

  return (
    <div className='mir-items-create-section' style={{paddingTop:'5px'}}>
       <div className="out-source-items-create-section-container">

                <FormControl style={{width:'100%'}} sx={{m:1,minWidth:120}} size="small">
                  <InputLabel id="demo-select-small-label">Section</InputLabel>
                  <Select
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    value={selectedField?.section}
                    label="section"
                    onChange={(e)=>handleChange('section',e.target.value)}
                   >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                      {
                        bomData?.data/* .filter(bData=> bData?.work_order_no==selectedField?.work_no) */?.map((fields)=>{
                          return <MenuItem value={fields?.section}>{fields?.section}</MenuItem>
                        })
                      }
                  </Select>
                </FormControl>


              <FormControl disabled={!selectedField?.section} style={{width:'100%'}} sx={{m:1,minWidth:120}} size="small">
                 <InputLabel id="demo-select-small-label">Part no</InputLabel>
                 <Select
                   labelId="demo-select-small-label"
                   id="demo-select-small"
                   value={selectedField?.part_no}
                   label="part_no"
                   onChange={(e)=>handleChange('part_no',e.target.value)}
                  >
                   <MenuItem value="">
                     <em>None</em>
                   </MenuItem>
                   {
                      bomData?.data?.filter(bData=> bData?.section==selectedField?.section/* &&bData?.work_order_no==selectedField?.work_no  */).map((fields)=>{
                         return <MenuItem value={fields?.part_no}>{fields?.part_no}</MenuItem>
                      })
                   }
                 </Select>
            </FormControl>
                  <FormControl disabled={!selectedField?.part_no} style={{width:'100%'}} sx={{m:1,minWidth:120}} size="small">
                   <InputLabel id="demo-select-small-label">Meterial specification</InputLabel>
                     <Select
                      labelId="demo-select-small-label"
                      id="demo-select-small"
                      value={itemFromBom}
                      label="part_no"
                      onChange={(e)=>handleChange('material_specification',e.target.value)}
                     >
                     <MenuItem value="">
                       <em>None</em>
                     </MenuItem>
                     {
                       bomData?.data?.filter(bData=> bData?.section==selectedField?.section /* && bData?.work_order_no==selectedField?.work_no */ && selectedField?.part_no==bData?.part_no).map((fields)=>{
                          return fields?.material_specification?.map(speci=>{
                            return <MenuItem value={speci?._id}>
                              <p>{getStoreItem(speci?.item)}</p>
                            </MenuItem>
                          })
                       })
                     }
                   </Select>
                  </FormControl>

          </div>
            {
              /*cheking whether all field in the selectedField is emty string or not*/
               (()=>{
                  for(let key in selectedField){
                    if(selectedField[key]=='') return false
                  }
                  return true
               })() && ( 
               <div className='mir-create-btns'>
                <Button className='mir_btn' onClick={handleClick} variant='contained'>Save</Button>
                <Button className='mir_btn' onClick={()=>setField(defualtField)} variant='contained'>Cancel</Button>
               </div> )
            }
          <OutSourceTable id={id}/>
    </div>
  )
}