import { Button, TextField } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import {useGetBomByIdQuery, useGetStoreItemsQuery, useGetStoretemBySearchQuery, useUpdateBomMutation } from '../../../../../store/apiSlice'

export const Meterial_specification = ({id}) => {
    //temporary state for keeping items search text
    const [searchTextItem,setSearchText]=useState('')
    //updating bom meteria_specification
    const[updateBom]=useUpdateBomMutation()
    //geting previous bom material_specification
    const{data:bomData,isFetching}=useGetBomByIdQuery(id)

    //storeitem through searching
    const{data:storeData}=useGetStoretemBySearchQuery(searchTextItem)
    const{data:allStoreData}=useGetStoreItemsQuery()

    //temporary state for keeping data and updating
    const[updatedMetSpe,setUpdateMetSpe]=useState([])

    //changes flag
    const[isChanges,setChanges]=useState(false)

    /* after fetching data of bom -> material_specification data passing in to setUpdateMetSpe */
    useEffect(()=>{
        if(bomData?.data?.material_specification){
           setUpdateMetSpe(bomData?.data?.material_specification)
        }else{
            setUpdateMetSpe([{}])
        }
    },[bomData?.data])
    
    //click event from li
    const handleUpdateBom=(data)=>{
        if(bomData?.data?.material_specification?.some(speci=> speci?.item==data?._id)) return
        /*merging previous material_specification and new one together as an array
          along with id preset in the object. id is which bom is will get update that's id */
        const material_specification={id ,material_specification:[
        ...bomData?.data?.material_specification,
        {item:data?._id,specification:'',quantity:1}]}
        //updateBom a function passing id and meterial speci together as an object to update only adding new items
        updateBom(material_specification)
    }

    /*function return a value that is name of item that match with
    slected item in the bom documenet*/
    const getStoreItemName=(storeItemId)=>{
     return allStoreData?.data?.find((item)=> item?._id==storeItemId )?.name
    }

    //update handle function
    const handleChange=(data,value,key) =>{
    setChanges(true)
    setUpdateMetSpe(pre=>{
            return pre?.map(pEl=>{
                if(pEl?._id==data?._id){
                    return {...pEl, [key]:key=='quantity' ? +value: value}
                }else{
                    return pEl
                }
            })
        })
    }

    /*saving updated Field in the bom -> meterial specification*/
    const handleUpdate=()=>{
        const newMe_Speci= bomData?.data?.material_specification?.map((speci)=>{
            if(updatedMetSpe?.some(sSpeci=>sSpeci?.item==speci?.item)){
                return updatedMetSpe?.find(sSpeci=> sSpeci?.item==speci?.item)
            }else{
                return speci
            }
        })
        updateBom({id,material_specification:newMe_Speci})
        setChanges(false)
    }

    const widthOfSearch={
        maxWidth:'600px',
        width:'100%'
    }

    const tableHeaderStyle={
        backgroundColor:'#347dac',
        color:'white',
        borderRadius:'4px',
    }

    const handleUpdateMs=(msId)=>{
       updateBom({id,material_specification:bomData?.data?.material_specification?.filter(ms=>ms?._id!=msId)})
    }

  return (
    <div className='bom_material_specification'>
        <div style={{position:'relative',padding:'10px 0'}} className="botom_section flex justify-cen align-cen column" >
            <TextField style={widthOfSearch}
            value={searchTextItem}
            onChange={(e)=>{
                setSearchText(e.target.value)
            }} type='search' label='Search'/>
            {storeData?.data && (<ul style={{
                backgroundColor:'white',
                boxShadow:'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
                listStyle:'none',
                padding:'5px',
                position:'absolute',
                ...widthOfSearch,
                top:'50px',
                zIndex:'99'
            }}>
                {
                    storeData?.data?.map((data)=>{
                        return <li onClick={()=>{
                            handleUpdateBom(data)
                            setSearchText('')
                        }} style={{padding:'5px'}}><p>{data?.name}</p>
                        </li>
                    })
                }
            </ul>)}
        </div>
        <div className="selected_meterial_specification flex justify-cen " style={{width:'100%'}}>
            <table style={
            {
               width:'100%',
               maxWidth:'800px',
               borderSpacing: '5px'
            }
            }>
                <thead>
                    <tr>
                        <td style={tableHeaderStyle}><p>No</p></td>
                        <td style={tableHeaderStyle}><p>Item</p></td>
                        <td style={tableHeaderStyle}><p>Specification</p></td>
                        <td style={tableHeaderStyle}><p>Quantity</p></td>
                    </tr>
                </thead>
                <tbody>
                    {
                        bomData?.data?.material_specification?.map((speci,i)=>{
                            return <tr>
                                <td>{i+1}</td>
                                <td>{getStoreItemName(speci?.item)}</td>
                                <td><TextField style={{width:'100%'}} value={updatedMetSpe[i]?.specification ||updatedMetSpe[i]?.specification=='' ? updatedMetSpe[i]?.specification: speci?.specification}  onChange={(e)=>handleChange(speci,e.target.value,'specification')}  /></td>
                                <td><TextField style={{width:'100%'}} type='number' value={updatedMetSpe[i]?.quantity || updatedMetSpe[i]?.quantity==''? updatedMetSpe[i]?.quantity: speci?.quantity}  onChange={(e)=>handleChange(speci,e.target.value,'quantity')} /></td>
                                <td> <Button onClick={()=>handleUpdateMs(speci?._id)} style={{textTransform:'none'}} >Delete</Button></td>
                            </tr>
                        })
                    }
                </tbody>
            </table>
        </div>
        <div className="met_btns">
           {isChanges && (<Button variant='contained' style={{textTransform:'none',backgroundColor:'#347dac',color:'white'}} onClick={handleUpdate}>Save</Button>)} 
        </div>
    </div>
  )
}