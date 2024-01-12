import React from 'react'
import { useGetPoQuery, useUpdatePoMutation } from '../../store/apiSlice'
import { FaDeleteLeft } from "react-icons/fa6";

export const PoTable = ({id,itemNamecb}) => {
    const {data:poData}=useGetPoQuery(id)
    const[updatePo]=useUpdatePoMutation()

    const handleDelete=(poItemsId)=>{
        updatePo({id,items:poData?.data?.items?.filter(item=> item?._id!=poItemsId)}) 
    }


  return (
        <table className='po_table'>
            <thead>
                <tr>
                    <th>Item</th>
                    <th>Quantity</th>
                </tr>
            </thead>
            <tbody>
                {
                    poData?.data?.items?.map(item=>{
                        return <tr style={{position:'relative'}}>
                            <td>{itemNamecb(item?.item)}</td>
                            <td>{item?.quantity}</td>
                            <td style={{position:'absolute',right:'10px'}}><button style={{
                                border:'none',
                                outline:'none',
                                backgroundColor:'white',
                                fontSize:'20px',
                                cursor:'pointer',
                                color:'rgb(103, 103, 103)'
                            }} onClick={()=>handleDelete(item?._id)}><FaDeleteLeft/></button></td>
                        </tr>
                    })
                }
            </tbody>
        </table>
  )
}
