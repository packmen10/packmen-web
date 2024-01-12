import { Button, TextField } from '@material-ui/core'
import React, { useState } from 'react'
import { removingUnderscoore } from '../../costoumHoks/removingUnderscoore'
import useUpperFirstLetter from '../../costoumHoks/useUpperFirstLetter'
import CreateItemsTable from './CreateItemsTable'

export const CreateItems = ({add,update,deleteItem,titileField:titileFields,dataField,titile}) => {

    const[item,setItem]=useState({})
    console.log(item)
    const handleChange=(key,val)=>{
        setItem(pre=>({...pre,[key]:val}))
    }
    const handleClear=()=>{
      setItem({})
    }

  return (
    <>
        <div className="table-container" style={{minWidth:"50vw",width:"100%",height:"3000px"}}>
            <CreateItemsTable 
              dataField={dataField?.data} 
              tHead={titileFields?.map(el=> el?.name)}
              updateItem={update} 
              deleteItem={deleteItem} />
        </div>
        <div className="right-section-container" style={{maxWidth:"20vw",width:"100%"}}>
              <div className="create-section flex column align-cen"
                    style={{
                        maxWidth:"20vw",
                        width:"100%",
                        position:"fixed",
                        gap:"6px",
                        boxShadow:"rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                        padding:'30px',
                        borderRadius:"5px"}}>
                  <div className="input-fields flex column" style={{gap:"10px",width:"100%"}}>
                    <h3 style={{color:'#347dac',paddingBottom:'20px'}}>{`Create new ${titile}`}</h3>
                        {
                          titileFields?.map((field)=>{
                              if(field?.name=='No') return
                              return <TextField
                              value={item[field?.name]||''}
                              type={field?.type}
                              style={{width:"100%"}}
                              id="outlined-basic"
                              onChange={(e)=>handleChange(field.name,e.target.value)}
                              InputLabelProps={{ shrink: true, required: true }}
                              label={removingUnderscoore(useUpperFirstLetter(field?.name))}
                              variant="standard" />
                          })
                        }
                  </div>
                  <div className="btns-creteItem flex" style={{gap:'20px',width:'100%'}}>
                      <Button onClick={()=>{
                        add(item)
                        setItem({})
                      }}variant="text" style={{textTransform:'none',marginTop:'20px',width:"100%",height:'50px'}}>Create</Button>
                      <Button onClick={()=>{
                        handleClear()
                      }} variant="text" style={{textTransform:'none',marginTop:'20px',width:"100%",height:'50px'}}>Cancel</Button>
                      </div>
              </div>
        </div>
    </>
  )
}
